// zero and NaN are false
console.log(!!0); // false
console.log(!!NaN); // false
// any number other than zero or NaN is true
console.log(!!1); // true
console.log(!!42); // true
console.log(!!Infinity); // true
console.log(!!-1); // true
console.log(!!-42); // true
console.log(!!-Infinity); // true

// This can then be used as a way to get out
// of a loop that will reach zero at some point
var arr = [1, 2, 3, 4],
i = arr.length;
while (i--) {
    console.log(arr[i]);
}
// 4 3 2 1
