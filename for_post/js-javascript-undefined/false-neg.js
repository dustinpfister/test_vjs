let r;
try {
    r = typeof myVar === undefined;
} catch (e) {
    console.log(e.toString());
}
console.log(r); // false