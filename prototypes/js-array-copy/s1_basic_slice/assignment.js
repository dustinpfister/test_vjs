// and array of numbers
var a = [1, 2, 3, 4],
// just assigning a to b will just create a new
// refernce to the same array
b = a;

// so then a change to a will effect b
a[0] = 'a';
console.log(b.join());
// a,2,3,4
