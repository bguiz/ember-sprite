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

## Road map

- [x] Remove need to link additional stylesheet from `index.html`
  - by concatenating the sprite sheet's CSS with the main app's CSS
- [ ] Rerun upon file changes which trigger livereload

## Author

Brendan Graetz

## Licence

GPLv3
