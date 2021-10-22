let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

// loop back method
let loopBack = (dir_start, forFolder) => {
    forFolder = forFolder || function(files, dir){ console.log(dir + ' : ', files.join(', '), '\r\n') };
    if(dir_start.toLowerCase() === 'c:\\' || dir_start === '/' ){
        return readdir(dir_start)
        .then((files)=>{
            forFolder(files, dir_start);
            return Promise.resolve('done');
        });
    }
    return readdir(dir_start)
    .then((files)=>{
        forFolder(files, dir_start);
        return loopBack( path.join(dir_start, '..') );
    });
};

loopBack(process.cwd());