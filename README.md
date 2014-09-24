# ember-sprite

This is an ember addon, that generates a sprite sheet from a folder of images.
A sprite sheet consists of a single CSS file and a single image file.

It uses [broccoli-sprite](https://github.com/bguiz/broccoli-sprite) to do so,
and you can read more details there.

This module's purpose is to allow you to use broccoli-sprite within an
[ember-cli](http://www.ember-cli.com/) application.

## Usage

As with any other ember addon, you simply need to add it as a dependency of your ember-cli app.

    npm install --save-dev ember-sprite

That is all!

This has only been tested with ember-cli v0.0.46,
be sure to upgrade your apps to this version of ember-cli, or later.

## Configuration

All the configuration options are exactly the same as those in
[broccoli-sprite](https://github.com/bguiz/broccoli-sprite).

The only thing that you need to do in addition is:

- Put your images in the `public` folder (or a subfolder of `public`)
- Add the options for `broccoli-sprite` under `sprite` when instantiating `EmberApp`:

For example, if the images you would like to be sprited are in `public/images/sprites`,
you can configure your app like so:

    var app = new EmberApp({
        /* other options */
        sprite: {
          debug: true,
          src: [
            'images/sprites/**/*.png'
          ],
          spritePath: 'assets/sprites.png',
          stylesheetPath: 'assets/sprites.css',
          stylesheet: 'css',
          stylesheetOptions: {
            prefix: 'icon-',
            spritePath: '/assets/sprites.png',
            pixelRatio: 2,
          },
          layoutOptions: {
            padding: 2,
          },
        },
    }});

## Road map

- [x] Remove need to link additional stylesheet from `index.html`
  - by concatenating the sprite sheet's CSS with the main app's CSS
- [ ] Rerun upon file changes which trigger livereload

## Author

Brendan Graetz

## Licence

GPLv3
