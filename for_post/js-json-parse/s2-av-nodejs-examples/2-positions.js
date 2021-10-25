let path = require('path');
let uri_json = path.resolve( process.argv[2] || 'foo.json' );

console.log(uri_json);