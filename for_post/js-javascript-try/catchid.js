

var checkValue = function (n) {
    try {
        if (typeof n != 'number') {
            throw new Error('notNumber');
        }
        if (n < 0 || n > 100) {
            throw new Error('outOfRange')
        }
        if (n.toString() === 'NaN') {
            throw new Error('NaN')
        }
        return n;
    } catch (e) {
        if (e.message === 'outOfRange') {
            return n < 0 ? 0 : 100;
        }
        return 0;
    }
};

console.log(checkValue(42)); // 42
console.log(checkValue(320)); // 100
console.log(checkValue(-5)); // 0
console.log(checkValue(NaN)); // 0
console.log(checkValue('foo')); // 0
