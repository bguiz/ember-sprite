/*
  This file tells node-sprite-generator that for our retina icons we want to
  ovveride an icon's background image to use the retina sprite and use the
  correct background size from that sprite
*/

@media (min--moz-device-pixel-ratio: 2),
     (-o-min-device-pixel-ratio: 2/1),
     (-webkit-min-device-pixel-ratio: 2),
     (min-device-pixel-ratio: 2)
{
  .icon {
    background: url('/assets/sprite-2x.png') no-repeat;
    background-size: <%= getCSSValue(layout.width) %> <%= getCSSValue(layout.height) %>;
  }
}
