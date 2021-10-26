// a source array of objects
var source = [{x:1, y: 2},{x:12, y: 50},{x:7, y: 27}];
// creating a new copy of source array of objects
var copy = source.map(function (pt) {
        return {
            x: pt.x,
            y: pt.y
        };
    });
// mutating copy
copy = copy.map(function (pt) {
        return {
            x: pt.x - 5,
            y: pt.y - 5
        };
    });
// only copy of array effected
console.log(copy);
// [ { x: -4, y: -3 }, { x: 7, y: 45 }, { x: 2, y: 22 } ]
console.log(source);
// [ { x: 1, y: 2 }, { x: 12, y: 50 }, { x: 7, y: 27 } ]