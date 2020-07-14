var obj = {
    x: 40,
    y: 5
};

console.log( String(obj) );
// [object Object]

var pt = {
    x: 40,
    y: 5,
    toString: function () {
        return '(' + this.x + ', ' + this.y + ')';
    }
};

console.log( String(pt) );
// (40, 5)
