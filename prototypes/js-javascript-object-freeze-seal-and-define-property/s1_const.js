const n = 42;
try {
    n = 40;
} catch (e) {
    console.log(e.message);
}
console.log(n); // 42

const obj = {
    n: 42
};
obj.n = 40;
console.log(obj.n);
