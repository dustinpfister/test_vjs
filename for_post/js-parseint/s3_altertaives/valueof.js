let obj = {
    str: '42.1234',
    valueOf: function () {
        return Math.floor( Number(this.str) );
    }
};

console.log( Number(obj) );  // 42
console.log( obj.valueOf() ); // 42
console.log( obj * 1 ); // 42