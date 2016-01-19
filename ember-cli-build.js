/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sprite: [
      {
        src: [
          'images/sprite/1x/**/*.png'
        ],
        compositor: 'gm',
        spritePath: 'assets/sprite.png',
        stylesheetPath: 'assets/sprite.css',
        stylesheet: 'tests/dummy/app/styles/sprite.tpl',
        stylesheetOptions: {
          prefix: 'icon.icon-',
          spritePath: '/assets/sprite.png',
          pixelRatio: 1
        },
        layoutOptions: {
          padding: 0
        },
        layout: 'horizontal'
      },
      {
        src: [
          'images/sprite/2x/**/*.png'
        ],
        compositor: 'gm',
        spritePath: 'assets/sprite-2x.png',
        stylesheetPath: 'assets/sprite-2x.css',
        stylesheet: 'tests/dummy/app/styles/sprite-2x.tpl',
        stylesheetOptions: {
          prefix: 'icon.icon-',
          spritePath: '/assets/sprite-2x.png',
          pixelRatio: 2
        },
        layoutOptions: {
          padding: 0
        },
        layout: 'horizontal'
      }
    ]
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
