
// taken from biginterger
// https://github.com/jtobey/javascript-bignum/blob/master/biginteger.js

BigInteger.prototype.divRem = function (n) {
    n = BigInteger(n);
    if (n._s === 0) {
        throw new Error("Divide by zero");
    }
    if (this._s === 0) {
        return [BigInteger.ZERO, BigInteger.ZERO];
    }
    if (n._d.length === 1) {
        return this.divRemSmall(n._s * n._d[0]);
    }

    // Test for easy cases -- |n1| <= |n2|
    switch (this.compareAbs(n)) {
    case 0: // n1 == n2
        return [this._s === n._s ? BigInteger.ONE : BigInteger.M_ONE, BigInteger.ZERO];
    case -1: // |n1| < |n2|
        return [BigInteger.ZERO, this];
    }

    var sign = this._s * n._s;
    var a = n.abs();
    var b_digits = this._d.slice();
    var digits = n._d.length;
    var max = b_digits.length;
    var quot = [];
    var guess;

    var part = new BigInteger([], 1);
    part._s = 1;
    while (b_digits.length) {
        part._d.unshift(b_digits.pop());
        part = new BigInteger(part._d, 1);

        if (part.compareAbs(n) < 0) {
            quot.push(0);
            continue;
        }
        if (part._s === 0) {
            guess = 0;
        } else {
            var xlen = part._d.length,
            ylen = a._d.length;
            var highx = part._d[xlen - 1] * BigInteger.base + part._d[xlen - 2];
            var highy = a._d[ylen - 1] * BigInteger.base + a._d[ylen - 2];
            if (part._d.length > a._d.length) {
                // The length of part._d can either match a._d length,
                // or exceed it by one.
                highx = (highx + 1) * BigInteger.base;
            }
            guess = Math.ceil(highx / highy);
        }
        do {
            var check = a.multiplySingleDigit(guess);
            if (check.compareAbs(part) <= 0) {
                break;
            }
            guess--;
        } while (guess);

        quot.push(guess);
        if (!guess) {
            continue;
        }
        var diff = part.subtract(check);
        part._d = diff._d.slice();
    }

    return [new BigInteger(quot.reverse(), sign),
        new BigInteger(part._d, this._s)];
};
