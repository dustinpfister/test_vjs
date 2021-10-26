// ES5- Style function expression that returns a 
// product
var foo = function (a, b) {
    return a + b;
};

// ES2015+ style arrow function with brackets that 
// returns a product
let bar = (a, b) => {
    return a + b;
};

// ES2015+ style arrow function with an implicit 
// return of a product

let baz = (a, b) => a + b;

console.log(foo(5,2)); // 7
console.log(bar(5,2)); // 7
console.log(baz(5,2)); // 7