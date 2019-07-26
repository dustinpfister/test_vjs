let r;
try {
    r = typeof myVar === undefined;
} catch (e) {
    console.log(e.toString());
}
console.log(r); // false

r = 0;
try {
    r = Number(myVar === undefined);
} catch (e) {
    r = -1;
}
console.log(r); // -1
