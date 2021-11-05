var func = function () {
    var foo = 30;
};

var func2 = function () {
    try {
        return foo; // undefined
    } catch (e) {
        return e.message;
    }
};

console.log( func() );
// undefined
console.log( func2() );
// 'foo is not defined'
