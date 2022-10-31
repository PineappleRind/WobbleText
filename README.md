# WobbleText
Animate wobbles into your text

## Installation
Copy index.min.js into a file in your project and reference it in your HTML

## Usage
WobbleText adds a `WobbleText` function to the global window object.

Call the wobble function like this:
```js
WobbleText(element, {
    // options
})
```

## Options
#### `resolution`
The amount of elements the text is split into. Higher resolution = worse performance. Lower resolution = worse appearance.

If you decrease the resolution, you may want to tweak some other options to get it to look more uniform.

Default is `20`.
#### `speed`
What it says it is. If you have any ideas on how to better describe it, be sure to make a pull request.

Higher number = lower speed, lower number = higher speed.

Default is `30`.
#### `intensity`
What the sine is multiplied by. Higher numbers make the elements skewed more.

Default is `10`.
#### `wobbliness`
The speed of individual elements. Lower numbers make it look more like the text is just being skewed. Higher numbers make it look more wobbly.

Default is `1`.

#### `overlapProtection`
A number in between 0 and 1. 1 makes the clip-path of the elements overlap each other more, therefore protecting them from having any gaps in between themselves.

Make sure to use the right overlap protection for your use case, as lower numbers give a more accurate simulation. 

Default is `0`.

#### `direction`
A string, either `x` or `y`. This really only changes the way it's skewed (`skewX` vs `skewY`). Default is `x`.

#### `gradient`
An object with 2 properties: `from` and `to`

These properties contain an array of numbers as HSL values.

Example:
```js
gradient: {
    from: [270, 100, 60], // Purple
    to: [220, 100, 80]    // Light blue
}
```

This will make the text color a gradient from purple top to light blue bottom. It lerps between from and to for each individual element (higher resolution = more accuracy!)
## How it works
- The text is split into a number of \<p\> elements (determined by `options.resolution`)
- Each element is then `clip-path`ed to a certain vertical/horizontal range. The percentage is determined by its index. 
- Their skewX/skewY transform property is updated each frame by this equation:
- - `Math.sin((tick + delay * wobbliness) / (speed * resolution)) * intensity`
- - Tick is the tick count (increased every frame, obviously)
- - Delay is the element's index multiplied by 100
- - Wobbliness, speed, resolution, and intensity can all be specified in `options`

## Example

The example can be found either at `example.html` or [this Codepen link](https://codepen.io/northernlights3/pen/KKeVKeY).

---
_Current Version: 0.2.0 (beta)_

_Author: [PineappleRind](https://github.com/pineapplerind)_
