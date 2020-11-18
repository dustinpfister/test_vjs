let sum = function () {
    let sum = 0,
    i = 0,
    len = arguments.length;
    if (len >= 1) {
        while (i < len) {
            sum += arguments[i];
            i += 1;
        }
    }
    return sum;
};

console.log(sum()); // 0
console.log(sum(5)); // 5
console.log(sum(5, 10, 7)); // 22