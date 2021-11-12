
var func = (function () {
    // object with keys
    var obj = {
        40: 'good',
        42: 'great'
    };
    // returning a public function for the 'func'
    // global variable
    return function (n) {
        if (n in obj) {
            return obj[n];
        }
        return 'bad';
    };
}
    ());
console.log(func(40)); // good
console.log(func(42)); // great
console.log(func()); // bad