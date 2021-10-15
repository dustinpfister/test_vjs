// declarations (and expressions) can
// be used with Function methods like Function.call
console.log(declar.call({
        b: 5
    }, 25)); // 30
// arrow functions can not, the this keyword will
// still refer to the top level scope here
console.log(arrow.call({
        b: 5
    }, 25)); // 27
