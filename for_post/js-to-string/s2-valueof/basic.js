var obj = {
    exp: 4,
    base: 2,
    valueOf: function () {
        return Math.pow(this.base, this.exp);
    },
    toString: function () {
        return '*' + this.valueOf() + '*';
    }
};

var n = obj + 5,
str = String(obj) + 5;

console.log(n, typeof n); // 21 'number'
console.log(str, typeof str); // *16*5 string
