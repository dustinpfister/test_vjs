var str = 'abcd';
var arr = str.split('').map(function (ch) {
        return parseInt(ch, 16);
    });
console.log(arr);
// [10,11,12,13]
