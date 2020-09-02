
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 100

};

var a = Math.atan2(p1.y - p2.y, p1.x - p2.x) + Math.PI;

console.log(a / Math.PI * 180); // 63.43

