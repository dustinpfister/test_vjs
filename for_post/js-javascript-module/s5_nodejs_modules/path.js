// loading in the path module
let path = require('path');
console.log(process.cwd()); // current working dir
console.log(__dirname);     // dir that this file is in
// using the path join method
console.log( path.join(process.cwd(), 'lib/foo.js') );
console.log( path.join(__dirname, 'lib/foo.js') );