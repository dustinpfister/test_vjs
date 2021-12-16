let a = [0, 1, 2, null, 3, 4, 5, 6, 7, null, 8, 9],
b = [];

let i = a.findIndex((n) => {
        return n === null;
    }),
n = a[i + 1];
while (n != null) {
    b.push(n);
    i += 1;
    n = a[i + 1];
}

console.log(b); // [3,4,5,6,7]
