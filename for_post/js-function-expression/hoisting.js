

try {
    bar(); // ERROR calling undefined

} catch (e) {

    console.log(typeof bar); // undefined

}
var bar = function () {

    return 'foo';

};

console.log(typeof bar); // function
