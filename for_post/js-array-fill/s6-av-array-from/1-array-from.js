// fill an array
var fill = function (count, val) {
    return Array.from({
        length: count
    }).map(function () {
        return val;
    });
};
console.log( fill(10, 0) );
// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
