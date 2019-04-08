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