// and array of numbers
var a = [1, 2, 3, 4, 0, 0, -4, -2, 0, 2, 4, 6, 8];

var b = [];
var c = a.find(function (n, i, arr) {
        if (i >= 5) {
            b.push({
                index: i,
                n: n
            });
            return n > 2;
        }
        return false;
    });
console.log(b);
console.log(c); // 4
