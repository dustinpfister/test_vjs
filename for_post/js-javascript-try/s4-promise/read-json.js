const fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);
 
let uri_json = process.argv[2] || path.join(__dirname, 'conf.json');
 
readFile(uri_json, 'utf8')
.then((JSON_text) => {
    try {
        return JSON.parse(JSON_text);
    } catch (e) {
        return Promise.reject(e);
    }
})
.then((obj) => {
    console.log('JSON FIle parsed successfully');
    console.log(obj);
})
.catch((e) => {
 
    // what to do if the file is not found
    if (e.code === 'ENOENT') {
        console.log('The JSON file at ' + uri_json + ' was not found');
    }
 
    if(e.name === 'SyntaxError') {
        console.log('looks like we have a syntax error');
        console.log('a good reason for this is that the JSON file is no good');
    }
 
});