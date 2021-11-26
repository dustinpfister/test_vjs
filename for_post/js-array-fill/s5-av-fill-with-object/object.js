var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

var fillWithClonedObject = function (obj) {
    return Array.apply(null, {
        length: 3
    }).map(function () {
        return clone(obj);
    });
};

var arr = fillWithClonedObject({
        x: 4,
        y: 7
    });

arr[1].x = 0;
console.log(arr);
// [ { x: 4, y: 7 }, { x: 0, y: 7 }, { x: 4, y: 7 } ]
