
let getCheckSum = function (string, maxValue) {
    maxValue = maxValue == undefined ? Math.pow(10, 7) : maxValue;
    return string.split('').reduce(function (acc, str) {
        return acc += str.charCodeAt(0);
    }, 0) % maxValue;
};
// demo
let a = 'This is a string that has a given value',
b = 'So does this other string';
// getting values in a 0-1999 range
console.log( getCheckSum(a, 2000) ); // 1568
console.log( getCheckSum(b, 2000) ); // 398
