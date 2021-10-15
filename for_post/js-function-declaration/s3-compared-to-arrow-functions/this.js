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
