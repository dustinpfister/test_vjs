// range
var getRange = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums);
    return max - min;
};

var arr = [-5, 10, 8, 3, 0];

console.log(getRange(arr));