let path = require('path');
let point = require(path.join(__dirname, './points.js'));
 
let a = point(45, 15),
b = point(0, 0),
d = Math.floor(point.distance(a, b));
 
console.log(d); // 47
