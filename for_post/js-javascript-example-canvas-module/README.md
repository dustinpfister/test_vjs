# js-javascript-example-canvas-module

In many of my vanilla javascript canvas examples thus far I am using a create canvas method as a standard way of createing a canvas element. This might be a step in the right direction compared to doing everything over from the ground up each time I start a new project, however using just that method alone is a bit lacking to put it lightly. This javascript example is then a start at making my own more full featured canvas librray, that goes beyond just somehting that creates and returns an object with a canvas as one of the properties that has a few things set up just the way I like it.


### Points object format

The format for points is an array of arrays that can be like this:

```js
    /*
    var points = [
        [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
        [30, 80, 165, 55, 22, 200, 'fill:red']
    ];
     */
```