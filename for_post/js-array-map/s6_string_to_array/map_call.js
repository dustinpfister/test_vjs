var str = 'abcd';
var arr = Array.prototype.map.call(str, function (ch) {
        return parseInt(ch, 16);
    });
console.log(arr);
// [10,11,12,13]
