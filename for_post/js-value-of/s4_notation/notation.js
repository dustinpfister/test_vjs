var Note = function (m, n) {
   this.mantissa = m;
   this.orderOfMagnitude  = n;
};
Note.prototype.valueOf = function () {
    return this.mantissa * Math.pow(10, this.orderOfMagnitude);
};

var n = new Note(1.57, 10);
console.log(n + 1); // 15700000001
