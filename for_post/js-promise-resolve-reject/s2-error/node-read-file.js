let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

let uri_file = path.resolve(process.argv[2] || process.cwd());

// simple read file example that can result in an error
readFile(uri_file)
.catch((e) => {
    console.warn(e.code);
    console.wran(e.message);
    console.wran('\n');
})
.then((data) => {
    console.log('all is good, got file data');
    console.log(data.toString(16));
});
