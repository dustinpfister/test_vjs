
let util = require('util'),
fs = require('fs');

let readDir = (dir) => {
    return util.promisify(fs.readdir)(dir);
};

Promise.all([
        util.promisify(fs.stat)('./text.txt'),
        util.promisify(fs.readFile)('./text.txt')
    ])

.then((a) => {
    console.log(a[0].isFile()); // true
    console.log(a[1].constructor.name); // Buffer
})

.catch ((e) => {
    console.log(e.message);
});
