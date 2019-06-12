(function () {
    var n = 42;
    console.log(n); // 42
}());

try {
    console.log(n);
} catch (e) {
    console.log(e.message);
    // 'n is not defined'
}
