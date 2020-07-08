var pat = /foo/,
m = pat.exec('This is all foobar');

console.log(m[0]); // 'foo'
console.log(m.index) // 12
console.log(m.input) // 'This is all foobar'
