// the os module
let os = require('os');
// random number
var n = Math.random();
// using the write method of the stdout stream
// of the process global
process.stdout.write( String(n) + os.EOL )
