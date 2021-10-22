let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
stat = promisify(fs.stat),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);


let startPath = process.argv[2] || process.cwd();

stat(startPath)
.catch((e)=>{
    startPath = process.cwd();
    console.warn('Error with the given path:');
    console.warn(e.message); 
    console.warn('defaulting to ' + startPath);
    return stat(startPath);
})
.then((statObj)=>{
    if(statObj.isDirectory()){
        return Promise.resolve( path.join(startPath, 'conf.json') );
    }
})
.then((filePath)=>{
    console.log(filePath);
});