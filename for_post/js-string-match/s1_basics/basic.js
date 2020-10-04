let str = 'foo bar baz bar 42 zoo bar';

// String.indexOf
console.log( str.indexOf('bar') );
// 4

// String.match
var match = str.match('bar');
console.log( match.index ); // 4
console.log( match[0] ); // 'bar'
//[ 'bar', index: 4, input: 'foo bar baz bar 42 zoo bar' ]