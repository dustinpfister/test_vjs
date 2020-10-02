var a = 'abcd';
var b = Array.prototype.map.call(a, function (ch) {
        return parseInt(ch, 16);
    }).join('-');;
console.log(b);
// '10-11-12-13'
