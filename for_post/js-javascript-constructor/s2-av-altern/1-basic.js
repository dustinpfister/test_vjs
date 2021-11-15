// simple Unit constructor
var Unit = function (opt) {
    opt = opt || {};
    this.w = opt.w || 0;
    this.h = opt.h || 0;
};
// simple Unit prototype method
Unit.prototype.getArea = function () {
    return this.w * this.h;
};

// an object literal
var Ship = {};
// a create method that returns an object with
// w, and h properties as public own property keys
Ship.create = function (opt) {
    opt = opt || {};
    return {
        w: opt.w || 0,
        h: opt.h || 0
    };
};
// a get area method that accepts a plain object
// with w and h properties like that of what is returned
// by the Ship.create method
Ship.getArea = function (ship) {
    return ship.w * ship.h;
};
// Demo
var u = new Unit({w:32, h:32});
console.log( u.getArea() );    // 1024
console.log( Ship.getArea(u)); // 1024
 
var s = Ship.create({w:32, h:32});
console.log( Ship.getArea(s));  // 1024
console.log( Unit.prototype.getArea.call(s)); // 1024
 