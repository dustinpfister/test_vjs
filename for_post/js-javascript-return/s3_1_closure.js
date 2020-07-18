var count = function (si) {
    var i = si === undefined ? 0 : si;
    return function () {
        i += 1;
        return i;
    };
};

var c = count();

console.log( c() ); // 1
console.log( c() ); // 2
console.log( c() ); // 3
