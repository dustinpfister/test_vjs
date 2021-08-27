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

This is the format that I worked out for my other javaScript example post on a draw points method, which I added as a method to this canvas module.

### The plugin format

I added a canvas module load method that can be used as a way to extend the module with custom methods for drawing, and creating a collection of points. For now this is the format that I have togetaher for this sort of thing.

```js
canvasMod.load({
    // points methods to add
    pointsMethods : [
        // a circle method
        {
            name: 'circle',
            method: function(cx, cy, radius, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                var points = [[]];
                var i = 0, x, y, radian;
                while(i < pointCount){
                    radian = Math.PI * 2 / pointCount * i;
                    x = cx + Math.cos(radian) * radius;
                    y = cy + Math.sin(radian) * radius;
                    points[0].push(x, y);
                    i += 1;
                }
                return points;
            }
        },
        // an oval method
        {
            name: 'oval',
            method: function(cx, cy, radius1, radius2, pointCount){
                pointCount = pointCount === undefined ? 100 : pointCount;
                var points = [[]];
                var i = 0, x, y, radian;
                while(i < pointCount){
                    radian = Math.PI * 2 / pointCount * i;
                    x = cx + Math.cos(radian) * radius1;
                    y = cy + Math.sin(radian) * radius2;
                    points[0].push(x, y);
                    i += 1;
                }
                return points;
            }
        }
    ],
    drawMethods: [
        {
            name: 'print',
            method: function(stack, ctx, canvas, layerObj, text, x, y, opt){
                opt = opt || {};
                opt.fontSize = opt.fontSize || 10;
                ctx.fillStyle = opt.fillStyle || 'black';
                ctx.textBaseline = 'top';
                ctx.font = opt.fontSize + 'px arial';
                ctx.fillText(text, x, y);
            }
        }
    ]
});
```