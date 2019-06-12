this.n = 42;

try {
    console.log(n);
} catch (e) {
    console.log(e.message);
    // 'n is not defined'
}

// However monkey patching some objects
// might not be such a great idea,
// and may defeat the whole purpose in the process
Object.prototype.n = 42;
console.log(Object.n); // 42
console.log(Math.n); // 42
console.log({}
    .n); // 42

console.log(n); // 42
