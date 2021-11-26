// If I want an array of numbers I can use array map
// after array split and then do what I need to convert
// the sub strings to numbers such as using parseInt
var arr = '0,1,2,3'.split(',').map(function (str) {
    return Math.pow(2, parseInt(str));
});
console.log(arr); // [ 1, 2, 4, 8 ]
// the array join method can be used to then create a sing again from this array
console.log( arr.join('-') ); // '1-2-4-8'