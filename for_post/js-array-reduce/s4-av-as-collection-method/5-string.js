// a string of numbers
let str = '123';
// The string split method can be used with an empty string
// I will then want to use parseInt or some method of 
// converting the string values to numbers
let sum = str.split('').reduce((acc, el) => {
    return acc + parseInt(el);
}, 0);
console.log(sum);
