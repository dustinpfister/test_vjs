let path = require('path'),
fs = require('fs'),
uri_json = path.resolve(process.argv[2] || 'foo.json');
// reading the file
fs.readFile(uri_json, 'utf8', (e, text) => {
    if (e) {
        console.warn(e.message);
    } else {
        try {
            let obj = JSON.parse(text);
            console.log(obj);
        } catch (e) {
            console.warn(e.message);
        }
    }
});
