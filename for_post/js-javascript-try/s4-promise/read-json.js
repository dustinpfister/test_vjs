const fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

let uri_json = path.join(__dirname, 'foo.json');

readFile(uri_json, 'utf8')
.then((JSON_text) => {
	
	
})
.catch((e) => {

    console.log(e);

});
