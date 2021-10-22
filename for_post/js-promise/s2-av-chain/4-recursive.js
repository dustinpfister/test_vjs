let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

// loop back method
let loopBack = (dir_start, forFolder, acc) => {
    acc = acc || [];
    forFolder = forFolder || function(files, dir, acc){ acc.push({files: files, dir: dir}) };
    // if we are at root
    if(dir_start.toLowerCase() === 'c:\\' || dir_start === '/' ){
        return readdir(dir_start)
        .then((files)=>{
            forFolder(files, dir_start, acc);
            return Promise.resolve(acc);
        });
    }
    return readdir(dir_start)
    .then((files)=>{
        forFolder(files, dir_start, acc);
        // calling loopBack itself as long as we are not at root
        return loopBack( path.join(dir_start, '..'), forFolder, acc );
    });
};

loopBack(process.cwd())
.then((result) => {
    console.log(result);
})