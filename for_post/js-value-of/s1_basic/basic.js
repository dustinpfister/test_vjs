var obj = {
    exp: 4,
    base: 2,
    valueOf: function () {
        return Math.pow(this.base, this.exp);
    }
};
var n = obj + 5;
console.log(n); // 21