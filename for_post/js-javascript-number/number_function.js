let n = Number('17');
console.log(typeof n); // 'number'
console.log(n); // 17

// String with a space results in NaN
n = Number('17 6');
console.log(typeof n); // 'number'
console.log(n); // NaN

// Booleans
n = Number(true);
console.log(typeof n); // 'number'
console.log(n); // 1

// Objects with valueOf methods
let obj = {
    x: 10,
    y: 42,
    valueOf: function () {
        return this.x + this.y;
    }
}
n = Number(obj);
console.log(n); // 52
console.log(parseInt(obj)); // NaN
