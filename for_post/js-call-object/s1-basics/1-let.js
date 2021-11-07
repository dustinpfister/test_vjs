let func = function (a, b) {
    let c = 5;
    if (arguments.length >= 2) {
        c += 5;
    }
    return a + b + c;
};
 
console.log(func(3, 2)); // 15
