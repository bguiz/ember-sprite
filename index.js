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
        var rasterSpriteOptions = this.app.options.sprite;
        var spriteTree = rasterSpriteOptions && brocPickFiles(workingTree, {
            files: rasterSpriteOptions.src,
            srcDir: '/',
            destDir: '/',
        });
        var vectorSpriteOptions = this.app.options.vectorSprite;
        var vectorSpriteTree = brocPickFiles(workingTree,  {
            files: vectorSpriteOptions.src,
            srcDir: '/',
            destDir: '/',
        });
        if ((rasterSpriteOptions && !!rasterSpriteOptions.debug) || (
            vectorSpriteOptions && !!vectorSpriteOptions.debug)) {
            console.log('spriteTree', util.inspect(workingTree, false, 6, true));
        }
        spriteTree = spriteTree &&
            brocSprite(spriteTree, rasterSpriteOptions);
        vectorSpriteTree = vectorSpriteTree &&
            brocVectorSprite(vectorSpriteTree, vectorSpriteOptions);
        var treesToMerge = [workingTree];
        if (spriteTree) {
            treesToMerge.push(spriteTree);
        }
        if (vectorSpriteTree) {
            treesToMerge.push(vectorSpriteTree);
        }
        workingTree = brocMergeTrees(treesToMerge);

        //sprites.css is appended to app.css,
        //so that two separate styles sheets do not need to get linked from index.html
        var appCssFile = 'assets/' + (this.app.name || this.app.project.pkg.name) + '.css';
        var cssInputFiles = [appCssFile];
        var cssDeleteFiles = [];
        if (spriteTree) {
            cssInputFiles.push(rasterSpriteOptions.stylesheetPath);
            cssDeleteFiles.push(rasterSpriteOptions.stylesheetPath);
        }
        if (vectorSpriteTree) {
            console.log('vectorSpriteTree', require('util').inspect(vectorSpriteTree, true, 6));
            var vectorOutput = 'assets/sprite.css';
            cssInputFiles.push(vectorOutput);
            cssDeleteFiles.push(vectorOutput);
        }
        var treeConcatCss = brocConcat(workingTree,  {
            inputFiles: cssInputFiles,
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
            files: cssDeleteFiles,
        });
    }

    return workingTree;
};
