'use strict';

var util = require('util');
var brocMergeTrees = require('broccoli-merge-trees');
var brocSprite = require('broccoli-sprite');
var brocVectorSprite = require('broccoli-sprite/vector');
var brocConcat = require('broccoli-concat');
var brocDelete = require('broccoli-file-remover');
var brocPickFiles = require('broccoli-static-compiler');

module.exports.name = 'ember-sprite';

module.exports.treeFor = function treeFor( /*inTree*/ ) {};

module.exports.postprocessTree =
function postprocessTree(type, workingTree) {
    if (type === 'all') {
        var spriteTree = brocPickFiles(workingTree, {
            srcDir: '/',
            files: this.app.options.sprite.src,
            destDir: '/',
        });
        var vectorSpriteTree = brocPickFiles(workingTree,  {
            srcDir: '/',
            files: this.app.options.vectorSprite.src,
            destDir: '/',
        });
        if (!!this.app.options.sprite.debug) {
            console.log('spriteTree', util.inspect(workingTree, false, 6, true));
        }
        spriteTree = brocSprite(spriteTree, this.app.options.sprite);
        vectorSpriteTree = brocVectorSprite(vectorSpriteTree, this.app.options.vectorSprite);
        workingTree = brocMergeTrees([
            workingTree,
            spriteTree,
            vectorSpriteTree
        ]);

        //sprites.css is appended to app.css,
        //so that two separate styles sheets do not need to get linked from index.html
        var appCssFile = 'assets/' + (this.app.name || this.app.project.pkg.name) + '.css';
        var spriteCssFile = this.app.options.sprite.stylesheetPath;
        var vectorSpriteCssFile = this.app.options.vectorSprite.stylesheetPath;
        var treeConcatCss = brocConcat(workingTree,  {
            inputFiles: [
                appCssFile,
                spriteCssFile,
                vectorSpriteCssFile
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
