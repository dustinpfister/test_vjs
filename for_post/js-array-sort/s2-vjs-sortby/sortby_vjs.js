var sort = function (arr, sorter, reverseWeight) {
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
    reverseWeight = reverseWeight === undefined ? false : reverseWeight;
    // clone the array by some means
    var copy = JSON.parse(JSON.stringify(arr));
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
            return reverseWeight ? 1 : -1;
        }
        if (c < d) {
            return reverseWeight ? -1 : 1;
        }
        return 0;
    });
    return copy;
};

// numbers
var nums = [3, 5, 6, 1, 7, 9, 3];
var numsSorted = sort(nums);
console.log(nums.join('-'));
console.log(numsSorted.join('-'));
// 3-5-6-1-7-9-3
// 9-7-6-5-3-3-1


var posts = [{
        wordCount: 500,
        time: 330,
        comentCount: 7
    }, {
        wordCount: 1800,
        time: 1000,
        comentCount: 0
    }, {
        wordCount: 750,
        time: 0,
        comentCount: 3
    }, ];

var byWordCount = sort(posts, function (post) {
        return post.wordCount;
    });
console.log(byWordCount);
// [ { wordCount: 1800, time: 1000, comentCount: 0 },
//   { wordCount: 750, time: 0, comentCount: 3 },
//   { wordCount: 500, time: 330, comentCount: 7 } ]

var byFresh = sort(posts, function (post) {
        return post.time;
    }, true);
console.log(byFresh);
// [ { wordCount: 750, time: 0, comentCount: 3 },
//   { wordCount: 500, time: 330, comentCount: 7 },
//   { wordCount: 1800, time: 1000, comentCount: 0 } ]