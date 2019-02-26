
var func = function (g) {
    if (g = g < -25 ? false : true) {
        return 'high';
    } else {
        return 'low';
    }
};

console.log( func(0) ); // 'high'
console.log( func(10) ); // 'high'
console.log( func(-20) ); // 'high'
console.log( func(-32) ); // 'low'


