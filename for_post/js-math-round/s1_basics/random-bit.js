var randomBit = function () {
    return Math.round(Math.random());
};


var i = 8,
byteArr = [];
while (i--) {
    byteArr.push(randomBit());
}
console.log(byteArr.join(''));
