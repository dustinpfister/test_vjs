// a function that uses three arguments, that can be used
// in a monotonic way, or not, depending on the argument domain
var threeArguments = function (x, min, max) {
    return min + (max - min) * (1 - (1 / (1 + x)));
};
// monotonic function that makes use of the three arguments function
// and uses it in a way that is strictly increasing, by making sure that
// proper values are used for the min and max arguments that will result in the
// return value only going up for all values of x 
var monotonic = function (x) {
    var a = x % 4,
    b = Math.floor(x / 4) * 5,
    c = b + 5;
    return threeArguments(a, b, c);
};
// seems to work
var x = 0,
len = 12,
results = [];
while (x < len) {
    results.push({
        x: x,
        y: parseFloat(monotonic(x).toFixed(2))
    });
    x += 1;
}
console.log(results.map((obj) => {
        return obj.y
    }));
//[ 0, 2.5, 3.33, 3.75, 5, 7.5, 8.33, 8.75, 10, 12.5, 13.33, 13.75 ]
