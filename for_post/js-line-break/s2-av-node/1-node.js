const os = require('os');

console.log(os.EOL === '\r\n'); // (true if windows)
console.log(os.EOL === '\n'); // (true if posix)

console.log( Buffer.from('\r\n').toString('hex') ); // 0d0a
console.log( '\u000d\u000a' === '\r\n'); // true
console.log( '\u000a' === '\n'); // true

let str = 'line one' + os.EOL +
'line two\r\n' +
'line three\n' +
'line four\u000d\u000a' +
'line five\u000a'+
'end';
process.stdout.write(str);