let util = require('util'),
path = require('path'),
fs = require('fs');
// returns a promise
let read = util.promisify(fs.readFile);
 
// mixed array of promises and other values
let mixed = () => {
    let hard = [42, 'bar'];
    return Promise.all([read('file1.txt'), read('file2.txt')].concat(hard))
    .then((result) => {
        return result.map((el) => {
            return el instanceof Buffer ? el.toString() : el;
        });
    })
    .catch((e) => {
        return hard;
    });
};
 
mixed().then((arr) => {
    console.log(arr);
});
