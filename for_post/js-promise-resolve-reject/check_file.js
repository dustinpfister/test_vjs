let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify;

let stat = promisify(fs.stat),
readFile = promisify(fs.readFile);

let thePath = path.resolve(process.argv[2] || process.cwd());

// get stats of path
stat(thePath)

// just check if dir
.then((stats) => {
    let isDir = stats.isDirectory();
    if (isDir) {
        // if dir using Promise.reject to reject
        // breaking the chain and jumping to catch
        return Promise.reject(new Error('the given path is a dir'));
    }
    return stats;
})

// read file
.then((stats) => {
    return readFile(thePath)
})

// log the data
.then((data) => {
    console.log(data.toString());
})

.catch((e) => {
    console.log(e.message);
});
