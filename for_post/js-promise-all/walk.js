
let util = require('util'),
fs = require('fs');

util.promisify(fs.readdir)('./')

.then((files) => {

    console.log(files);
    return Promise.all(files.map((file) => {
            return util.promisify(fs.stat)(file);
        }));

})

.then((result) => {

    console.log(result.map((stat) => {
            return stat.isFile()
        }))

})

.catch (() => {})
