/*
  This file tells node-sprite-generator that it should add css rules for each
  icon we are generating for our non-retina sprite.  We can override the
  background image for retina sprites in the sprite-2x.tpl file.
*/

.icon {
  background: url('<%= options.spritePath %>') no-repeat;
  background-size: <%= getCSSValue(layout.width) %> <%= getCSSValue(layout.height) %>;
  display: inline-block;
}

<% layout.images.forEach(function (image) { %>
  .<%= image.className %>
  {
    background-position: <%= getCSSValue(-image.x) %> <%= getCSSValue(-image.y) %>;
    width: <%= getCSSValue(image.width) %>;
    height: <%= getCSSValue(image.height) %>;
  }
<% }); %>
