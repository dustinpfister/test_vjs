let n = NaN;

// The Not a Number value is in fact actually a Number
console.log(typeof n); // 'number'

// So because NaN is a Number, Number prototype methods
// such as Number.toFixed can be used with a NaN value
console.log(n.toFixed(2)); // NaN

// This Fact can also be used as a way to help
// test for NaN
let isValueNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    if (String(a) === 'NaN') {
        return true;
    }
    return false;
};

console.log( isValueNaN(n) ); // true
console.log( isValueNaN('NaN') ); // false
console.log( isValueNaN(undefined) ); // false
console.log( isValueNaN(null) ); // false
