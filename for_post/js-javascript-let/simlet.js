var n = 42;
(function () {
    var x = 17;
}());

try {
    console.log(x);
} catch (e) {
    console.log(e.message); // x is not defined
}
