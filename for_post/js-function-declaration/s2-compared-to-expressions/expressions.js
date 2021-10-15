// function declarations can be called anywhere
// within the body of code
console.log(foo()); // 'bar'

function foo() {
    return 'bar';
};

// function expressions can not be called
// before they are assigned to a variable
try {
    bar(); // ERROR
} catch (e) {
    console.log(e.message); // 'bar is not defined'
}
let bar = function () {
    return 'foo';
};
console.log(bar()); // 'foo'
