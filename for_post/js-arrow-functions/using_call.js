// function expressions and function statements 
// can be used to make methods that utilize the
// this keyword.
let m = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};
let obj = {
    x: 5,
    y: 4
};
m.call(obj, -5, -4);
console.log(obj.x, obj.y); // 0 0

// However with arrow functions the this keyword
// is handled differently
let ma = (dx, dy) => {
    this.dx += dx;
    this.dy += dy;
}

ma.call(obj,7,3)
console.log(obj.x,obj.y); // 0 0
