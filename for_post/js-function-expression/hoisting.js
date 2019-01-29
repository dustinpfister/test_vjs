// a function expression where the bar variable
// is getting hoisted but with the value of undefined
try {
    bar(); // ERROR calling undefined

} catch (e) {

    console.log(typeof bar); // undefined

}
var bar = function () {

    return 'foo';

};
console.log(typeof bar); // function
 
// with function statements this is not a problem
 
console.log(foo()); // bar
 
function foo() {
    return 'bar';
};
 
console.log(foo()); // bar
