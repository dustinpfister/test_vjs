var n = 40;
if (n > 42) {
    var a = 5;
}
 
try {
    console.log(a); // undefined
} catch (e) {
    console.log(e.message);
}
