const n = 40;

// changing the value of n here
// will result in an error
try {
    n = 42;
} catch (e) {
    console.log(e.message);
    // Assignment to constant variable.
}

// however a new n can be declared in any
// block because like let it has block scope
if (n > 32) {
    const n = 16;
    console.log(n); // 16
}

console.log(n); // 40
