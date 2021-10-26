// function declaration
console.log(func1()); // 'foo'
function func1() {
    return 'foo';
};
console.log(func1()); // 'foo'

var obj = {};
// calling a function expression before is it define
try {
    console.log(obj.func2());
} catch (e) {
    console.log(e.message); // func2 is not a function
    console.log(obj.func2 === undefined); // true
}
// defining the expression here
obj.func2 = function () {
    return 'bar';
};
// works fine now
console.log(obj.func2()); // 'bar'
