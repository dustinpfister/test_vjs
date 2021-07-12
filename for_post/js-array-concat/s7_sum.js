let addArrays = (arr1, arr2) => {
    let arr = [],
    bigger = arr1.length > arr2.length ? arr1 : arr2,
    smaller = arr1.length < arr2.length ? arr1 : arr2;
    return bigger.map((n1, i) => {
        var n2 = smaller[i];
        if (typeof n2 === 'number') {
            return n1 + n2;
        }
        return n1;
    });
};

let a1 = [1, 2, 3, 4],
a2 = [5, 6, 7],
a3 = addArrays(a1, a2);
// create an array with the values added
console.log(a3); // [6, 8, 10, 4]
// create a sum
let a4 = a3.reduce((acc, n) => {
        return acc + n;
    });
console.log(a4); // 28
