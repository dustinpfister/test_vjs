let count = (arr) => {
    let i = arr.length,
    ct = 0;
    while (i--) {
        if (arr[i] !== undefined) {
            ct += 1;
        }
    }
    return ct;
}

// empty array with a length of 100
let a = new Array(100);

a[49] = 'foo';
a[70] = 'bar';

console.log(a.length); // 100
console.log(count(a)); // 2

a[71] = undefined;

// however declared yet undefined keys will not be counted
console.log(count(a)); // 2
console.log(Object.keys(a).length); // 3