let foo = function () {
 
    // creating a local scoped x
    let x = 40;
 
    // creating y as an implicit global
    y = 2;
 
    return x + y;
};
 
console.log(foo()); // 42
 
try {
    console.log(x); // will cause an error
 
} catch (e) {
 
    console.log(e.message); // 'x is not defined'
 
}
 
// will return a value of 2 because I have
// created an implicit global
console.log(y); // 2
