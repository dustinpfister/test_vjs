// and array of numbers
var a = [3, 3, 0, 12, 0, -7, 37, 2];

var max = Math.max.apply(null, a),
min = Math.min.apply(null, a);

console.log(max); // 37
console.log(min); // -7
