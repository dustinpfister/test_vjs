
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

var n = Number.MAX_SAFE_INTEGER + 1;

console.log(n === n + 1); // true (but should be false)
