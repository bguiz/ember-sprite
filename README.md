# ember-sprite

This is an ember addon, that generates a sprite sheet from a folder of images.
A sprite sheet consists of a single CSS file and a single image file.

It uses [broccoli-sprite](https://github.com/bguiz/broccoli-sprite) to do so,
and you can read more details there.

This module's purpose is to allow you to use broccoli-sprite within an
[ember-cli](http://www.ember-cli.com/) application.

## Usage

As with any other ember addon, you simply need to run the install command:

```sh
ember install ember-sprite
```

If you are still using Ember CLI < `v1.0`,
please upgrade to the latest version.
Check this package's version of `ember-cli` under `devDependencies`
for the best compatibility.

That is all!

## Configuration

All the configuration options are pretty much the same as those in
[broccoli-sprite](https://github.com/bguiz/broccoli-sprite).
There is an extra option `removeSrcFiles` which tells addon to remove
source images after the sprite is finished.

The only thing that you need to do in addition is:

- Put your images in the `public` folder (or a subfolder of `public`)
- Add an array of sprite options for `broccoli-sprite` under `sprite` when instantiating `EmberApp`:

For example, if the images you would like to be sprited are in `public/images/sprites`,
you can configure your app, in `ember-cli-build.js`, like so:

```javascript
var app = new EmberApp({
  /* other options */
  sprite: [
    {
      debug: true,
      src: [
        'images/sprites/**/*.png'
      ],
      removeSrcFiles: true,
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
      optiping: (process.env.NODE_ENV === 'production'),
    }
    // optional: more sprite sheet configurations
    // , { ... }
  ]
});
```

## Examples

## From scratch

```bash
# New ember-cli application
ember new ember-sprite-demo
ember install ember-sprite

# download images for spriting
mkdir -p public/images/sprites
curl https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png > public/images/sprites/emberjs.png
curl https://iojs.org/images/1.0.0.png > public/images/sprites/iojs.png
curl https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png > public/images/sprites/js.png

# add images to main template
echo '<div class="icon-emberjs"></div>' >> app/templates/application.hbs
echo '<div class="icon-iojs"></div>' >> app/templates/application.hbs
echo '<div class="icon-js"></div>' >> app/templates/application.hbs

# modify `EmberApp` to add the sprite configuration shown above
$EDITOR ember-cli-build.js

# run the application
ember server
$BROWSER http://localhost:4200
# check that sprited images appear
```

### From bundled demo page

Alternatively, you can clone this repository and run `ember server` to see a
sample application that generates both retina and non-retina sprites.

```bash
cd tests/dummy
ember server
```

## Road map

- [x] Remove need to link additional stylesheet from `index.html`
  - by concatenating the sprite sheet's CSS with the main app's CSS
- [ ] Rerun upon file changes which trigger livereload


## Contributors

Maintained by [Brendan Graetz](http://github.com/bguiz)

Additional contributions from:

- [Dhaulagiri](https://github.com/Dhaulagiri)
- [jmonster](https://github.com/jmonster)

## Licence

GPLv3
