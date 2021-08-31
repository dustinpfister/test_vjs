let fs = require('fs'),
path = require('path');
// using path and js modules
let uri = path.join(__dirname, 'fs.js');
fs.readFile(uri, 'utf8', (e, txt) => {
    if (e) {
        console.warn(e.messgae);
    } else {
        console.log(txt);
    }
});
