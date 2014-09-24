'use strict';

var brocMergeTrees = require('broccoli-merge-trees');
var brocSprite = require('broccoli-sprite');
var brocConcat = require('broccoli-concat');
var brocDelete = require('broccoli-file-remover');

module.exports.name = 'ember-sprite';

module.exports.treeFor = function treeFor(treeName) {
    console.log('ember-sprite treeFor', treeName);
    this.options = this.app.options.sprite || {};

    if (treeName === 'public') {
        var inTree = brocMergeTrees(['public']);
        var spriteTree = brocSprite(inTree, this.options);

        var outTree = spriteTree;
        return outTree;
    }

    return; //look ma, no assets!
};

module.exports.postprocessTree = function postprocessTree(type, workingTree) {
    console.log('ember-sprite postprocessTree', arguments);

    if (type === 'all') {
        //sprites.css is appended to app.css,
        //so that two separate styles sheets do not need to get linked from index.html
        var appCssFile = 'assets/' + this.app.options.name + '.css';
        var spriteCssFile = this.options.stylesheetPath;
        var treeConcatCss = brocConcat(workingTree,  {
            inputFiles: [
                appCssFile,
                spriteCssFile
            ],
            outputFile: '/'+appCssFile,
            wrapInFunction: false,
        });
        workingTree = brocMergeTrees([
            workingTree,
            treeConcatCss
        ], {
            overwrite: true,
        });
        workingTree = brocDelete(workingTree, {
            files: [
                spriteCssFile
            ],
        });
    }

    return workingTree;
};
