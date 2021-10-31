var bool = !0;
console.log(bool); // true
try {
    eval('0!');
} catch (e) {
    console.log(e.message); // Unexpected token !
}
