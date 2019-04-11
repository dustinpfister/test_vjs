// with arrow functions the this
// keyword is handled differently compared
// to declarations and expressions

// with arrow functions the this keyword refers to a
// scope that is one level up
this.b = 2;
let arrow = (a) => this.b + a;
console.log(arrow(40)); // 42

// with declarations this is not the case
function declar(a) {
    return this.b + a;
};
console.log(declar(40)); // NaN

// declarations (and expressions) can
// be used with Function methods like Function.call
console.log(declar.call({
        b: 5
    }, 25)); // 30

// arrow functions can not, the this keyword will
// still refer to the top level scope here
console.log(arrow.call({
        b: 5
    }, 25)); // 27

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
