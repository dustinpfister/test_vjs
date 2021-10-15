// declarations can also be used to create constructors
// while arrow functions can not
function MyCon(b) {
    this.b = b;
};
MyCon.prototype.func = function (a) {
    return this.b + a;
};
let d = new MyCon(50);
console.log(d.func(15)); // 65
