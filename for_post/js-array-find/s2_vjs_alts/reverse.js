
var cb = function (n) {
    return n > 2 && n < 6;
};

// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];

// the array reverse method would be one way
var b = a.reverse().find(cb);
console.log(b); // 5

