var sum = function (a, b) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    return a + b;
};

console.log(sum()); // 0
console.log(sum(5)); // 5
console.log(sum(2,6)); // 8
