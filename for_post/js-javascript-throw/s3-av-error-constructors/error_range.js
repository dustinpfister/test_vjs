
var checkNum = function (n) {
    if (typeof n != 'number') {
        throw TypeError('must give a number');
    }
    if (String(n) === 'NaN') {
        throw Error('value is a number, but is NaN');
    }
    if (n < 0 || n >= 10) {
        throw RangeError('must give a number between 0 and 9');
    }
    return n;
};

try {
    checkNum(25);
} catch (e) {
    console.log(e.name);
    console.log(e.message);
}
/*
RangeError
must give a number between 0 and 9
*/
