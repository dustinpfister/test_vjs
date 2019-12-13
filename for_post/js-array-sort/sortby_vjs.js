var sort = function (arr, sorter) {
    // return empty array if not array is given
    if (!arr) {
        return [];
    }
    // default sorter
    sorter = sorter || function (el) {
        if (typeof el === 'number' && el.toString() != 'NaN') {
            return el;
        }
        if (typeof el === 'string') {
            return parseInt(el, 16);
        }
        return 0;
    };
    // clone the array by some means
    var copy = JSON.parse( JSON.stringify(arr) );
    // using array sort off of the copy of the array
    // so that I do not mutate the argument array
    copy.sort(function (a, b) {
        // use the sorter to get number values for two
        // elements that are being compared
        var c = sorter(a),
        d = sorter(b);
        // return -1, 1, or zero to move down the index
        // move it up or do nothing
        if (c > d) {
            return -1;
        }
        if (c < d) {
            return 1;
        }
        return 0;
    });
    return copy;
};

var nums = [3, 5, 6, 1, 7, 9, 3];

var numsSorted = sort(nums);

console.log(nums.join('-'));
console.log(numsSorted.join('-'));
