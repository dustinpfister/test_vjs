// fill an array
var fill = function (count, val) {
    return Array.apply(0, {
        length: count
    }).map(function () {
        return val
    })
};

var newByt = function () {
    return fill(8, 1);
};

var b = newByt();

b[0] = 0;
b[7] = 0;

console.log(b.join('')); // '01111110'
