/* eslint-env node */
'use strict';

const util = require('util');
const brocMergeTrees = require('broccoli-merge-trees');
const brocConcat = require('broccoli-concat');
const brocDelete = require('broccoli-file-remover');
const brocPickFiles = require('broccoli-static-compiler');
const brocSprite = require('broccoli-sprite');

module.exports = {
  name: 'ember-sprite',
  treeFor: treeFor,
  postprocessTree: postprocessTree,
  _processSprite: _processSprite,
};

function treeFor( /*inTree*/ ) {}

function getAppCSSOutputPath(options) {
  let appCssOutputPath = options.outputPaths.app.css.app;

  if(appCssOutputPath[0] === '/' ){
    appCssOutputPath = appCssOutputPath.substr(1);
  }

  return appCssOutputPath;
}

function postprocessTree(type, workingTree) {
    if (type === 'all' && this.app.options.sprite) {
      var self = this;
      // retrieves the app CSS output path
      const appCssOutputPath = getAppCSSOutputPath(this.app.options);

      // for backwards compatibility to previous implementation that
      // passed plain object into sprite,
      // we push that object into an array we can iterate through to
      // process the sprite(s)
      if (Object.prototype.toString.call(this.app.options.sprite) ===
          '[object Object]') {

          var tmp = this.app.options.sprite;
          this.app.options.sprite = [];
          this.app.options.sprite.push(tmp);
      }
      // process each of the sprites that was passed in
      this.app.options.sprite.forEach(function eachSprite(sprite) {
          workingTree = self._processSprite(sprite, workingTree, appCssOutputPath);
      });
    }

    return workingTree;
}

function _processSprite(sprite, workingTree, appCssOutputPath) {
    var spriteTree = brocPickFiles(workingTree, {
        srcDir: '/',
        files: sprite.src,
        destDir: '/',
    });

    if (!!sprite.debug) {
        console.log('spriteTree', util.inspect(workingTree, false, 6, true));
    }
    spriteTree = brocSprite(spriteTree, sprite);
    workingTree = brocMergeTrees([
        workingTree,
        spriteTree
    ]);

    //sprites.css is appended to app.css,
    //so that two separate styles sheets do not need to get linked from index.html

    var spriteCssFile = sprite.stylesheetPath;

    var treeConcatCss = brocConcat(workingTree,  {
        inputFiles: [
          appCssOutputPath,
          spriteCssFile
        ],
        outputFile: "/" + appCssOutputPath,
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

    return workingTree;
}
