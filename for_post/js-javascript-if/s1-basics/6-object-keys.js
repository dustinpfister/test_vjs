// and object with keys and values
var obj = {
    40: 'good',
    42: 'great'
};
// a function that will use an if statement
// and the in operator to find out of there
// is a value to return, if not return 'bad'
var func = function (n) {
    if (n in obj) {
        return obj[n];
    }
    return 'bad';
};
console.log(func(40)); // good
console.log(func(42)); // great
console.log(func()); // bad
