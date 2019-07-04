// just logging a number literal
console.log(42); // 42

// setting a number to a variable
let x = 40;
console.log(x); // 40

// a number can be a result of an expression as well
let y = x + 2;
console.log(y); // 42

// numbers can also be what is returned by a
// static function such as Math.pow
let z = Math.pow(2, 4);
console.log(z); // 16

// numbers can be passed as arguments,
// and used inside the body of a function
let d = function (x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
};
console.log(d(x,y,z,0,0,0)); // 60.166435825965294
