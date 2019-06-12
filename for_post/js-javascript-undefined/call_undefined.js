// function declaration
console.log(func1()); // 'foo'
function func1() {
    return 'foo';
};
console.log(func1()); // 'foo'

// function expression
try {
    console.log(func2());
} catch (e) {
    console.log(e.message); // func2 is not a function
    console.log(func2 === undefined); // true
}
var func2 = function () {
    return 'bar';
};
console.log(func2()); // 'bar'
