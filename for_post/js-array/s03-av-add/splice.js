var a = [1, 2, 4, 5];
// first augment is an array index location
// second argument is the number of elements I want
// to remove, and the third argument is what I want to inject
a.splice(2, 0, 3);
console.log(a); // [1, 2, 3, 4, 5]