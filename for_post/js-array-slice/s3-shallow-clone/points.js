var points = [
    {
        x: 5,
        y: 42
    }, {
        x: 27,
        y: -15
    }
];
 
var p = points.slice();
 
points[0].x = 0;
 
console.log(points[0].x); // 0
console.log(p[0].x); // 0