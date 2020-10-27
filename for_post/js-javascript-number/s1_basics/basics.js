// just logging a number literal
console.log(42); // 42

// setting a number to a variable
let x = 40;
console.log(x); // 40

// a number can be a result of an expression as well
let y = x + 2;
console.log(y); // 42

// numbers can be what is returned by a
// static function such as Math.pow
let z = Math.pow(2, 4);
console.log(z); // 16

// there are a number of Number prototype
// methods that can be used
let m = 32.49273,
f = m.toFixed(2);
console.log(typeof f); // 'string'
console.log(f); // '32.49'

// numbers can be passed as arguments,
// and can be created and used inside the body of a function
let d = function (x1, y1, z1, x2, y2, z2) {
    let a = Math.pow(x1 - x2, 2),
    b = Math.pow(y1 - y2, 2),
    c = Math.pow(z1 - z2, 2)
        return Math.sqrt(a + b + c);
};
console.log(d(x, y, z, 0, 0, 0)); // 60.166435825965294
