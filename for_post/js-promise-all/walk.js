let util = require('util'),
path = require('path'),
fs = require('fs');
// functions that return a promise
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);
let fileData = (path_file) => {
    return stat(path_file).then((stats) => {
        return {
            stats: stats,
            isFile: stats.isFile(),
            fileName: path.basename(path_file),
            path_file: path_file
        }
    });
};
let readFile = util.promisify(fs.readFile);
 
// lets do it
let dir = path.resolve(process.argv[2] || process.cwd());
readdir(dir)
.then((files) => {
    return Promise.all(files.map((file) => {
            //return stat(path.join(dir, file));
            return fileData(path.join(dir, file));
        }))
})
.then((stats) => {

    console.log(stats);

});
