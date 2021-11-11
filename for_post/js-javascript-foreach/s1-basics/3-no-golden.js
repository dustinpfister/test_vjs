
let a = [1, 'a', 2, 'b'];

// array forEach Works for just looping over an array
a.forEach((el, i, arr) => {
    console.log(el, i, arr);
});
//1 0 [1, 'a', 2, 'b']
//a 1 [1, 'a', 2, 'b']
//2 2 [1, 'a', 2, 'b']
//b 3 [1, 'a', 2, 'b']

// Filter can be used to loop preform an action
// for each element also, and return a new array that
// just has elements that meet a given condition
let b = a.filter((el) => {
        return typeof el === 'number';
    });
console.log(b); // [1,2]
