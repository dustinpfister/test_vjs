let str = 'foo bar baz bar 42 zoo bar';
// doing s global Match
let match = str.match(/bar/g);
console.log(match); // ['bar', 'bar', 'bar']
console.log(match.index); // undefined
