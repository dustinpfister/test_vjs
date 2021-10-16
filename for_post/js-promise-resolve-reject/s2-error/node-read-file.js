let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

let uri_file = path.resolve(process.argv[2] || process.cwd());

// simple read file example that can result in an error
readFile(uri_file)
.catch((e) => {
    console.warn('code: ' + e.code);
    console.wran('message ' + e.message);
    console.wran('\n');
})
.then((data) => {
    console.log('all is good, got file data');
    console.log('buffer length: ' + data.length);
});
