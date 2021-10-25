let path = require('path');
let uri_json = path.resolve(process.argv[2] || 'foo.json');
// log mess that is the value of uri_json
console.log('parsing json file at: ');
console.log(uri_json);
// try using require to parse json
let obj = null;
try {
    obj = require(uri_json);
    console.log(obj);
} catch (e) {
    console.warn(e.message);
}
