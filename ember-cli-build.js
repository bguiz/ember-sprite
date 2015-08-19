/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  // Temporary location due to https://github.com/ember-cli/ember-cli/issues/4434
  // Can be moved inside EmberApp() with ember-cli 1.13.2
  defaults.sprite = [
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
  ];

  var app = new EmberApp(defaults, {
    // Add options here
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
