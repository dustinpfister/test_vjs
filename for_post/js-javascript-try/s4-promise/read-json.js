const fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

let uri_json = path.join(__dirname, 'conf.json');

readFile(uri_json, 'utf8')
.then((JSON_text) => {
    try {
        return JSON.parse(JSON_text);
    } catch (e) {
        return Promise.reject(e);
    }
})
.then((obj) => {
    console.log('JSON FIle parsed succesfly');
    console.log(obj);
})
.catch((e) => {

    // what to do if the file is not found
    if (e.code === 'ENOENT') {
        console.log('The conf.json file was not found');
    }

});
