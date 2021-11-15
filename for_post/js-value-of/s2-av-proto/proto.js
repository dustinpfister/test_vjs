
var Heading = function (x, y) {
    this.x = 0;
    this.y = 0;
    this.update(x, y);
};

Heading.prototype.update = function (x, y) {
    this.x = x === undefined ? this.x : x;
    this.y = y === undefined ? this.y : y;
    this.a = Math.atan2(this.y, this.x);

};

Heading.prototype.valueOf = function () {
    this.update();
    return this.a;

};

// Heading.prototype.valueOf supersedes
// Object.prototype.valueOf
var h = new Heading(0, 10),
a = (h + 1.57).toFixed(2);

console.log(a); // 3.14

// An own property of h will supersede all
// prototype methods
h.valueOf = function () {
    return Heading.prototype.valueOf.call(this) / (Math.PI * 2) * 360;
};
a = h + 90;

console.log(a); // 180