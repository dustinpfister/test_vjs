// using an arrow function, and the arguments.length prop
let func1 = (a, b) => {
    if(arguments.length === 2){
        return a + b;
    }
    return a;
};
// same function only using a function expression in place of an arrow function
let func2 = function(a, b) {
    if(arguments.length === 2){
        return a + b;
    }
    return a;
};
// arrow function will have wrong values for arguments.length
console.log( func1(1, 1) ); // 1
console.log( func2(1, 1) ); // 2
