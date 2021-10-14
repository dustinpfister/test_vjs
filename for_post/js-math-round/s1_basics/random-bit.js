// random bit method using Math.round
var randomBit = function () {
    return Math.round(Math.random());
};
// random byte string method
var randomByteStr = function () {
    var i = 8,
    byteArr = [];
    while (i--) {
        byteArr.push(randomBit());
    }
    return byteArr.join('');
};
// demo
console.log( randomByteStr() );
