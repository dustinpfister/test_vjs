// numbers can be passed as arguments,
// and can be created and used inside the body of a function
let d = function (x1, y1, z1, x2, y2, z2) {
    let a = Math.pow(x1 - x2, 2),
    b = Math.pow(y1 - y2, 2),
    c = Math.pow(z1 - z2, 2)
        return Math.sqrt(a + b + c);
};
console.log(d(x, y, z, 0, 0, 0)); // 60.166435825965294
