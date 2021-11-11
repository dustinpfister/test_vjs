
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

// the reduce method can be used to create a value that
// is a sum create from each element, or each element that meets
// a condition.
let c = a.reduce((acc, el) => {
        if (typeof el === 'number') {
            acc += el;
        }
        return acc;
    }, 0);
console.log(c); // 3

// the array map can preform an action for each element, and return a
// new array that is the result of some code that is run for each element.
let d = a.map((el) => {
        return typeof el === 'string' ? 0 : el;
    });
console.log(d); // [ 1, 0, 2, 0 ]

// native javaScript loops work fine too
let len = a.length, i = 0;
while(i < len){
    console.log(a[i], i);
    i += 1;
}
// 1   0
// 'a' 1
// 2   2
// 'b' 3
