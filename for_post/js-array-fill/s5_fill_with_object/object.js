var obj = {
    x: 4,
    y: 7
};

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

var arr = Array.apply(null, {
        length: 3
    }).map(function () {
        return clone(obj);
    });

arr[1].x = 0;
console.log(arr);
// [ { x: 4, y: 7 }, { x: 0, y: 7 }, { x: 4, y: 7 } ]
