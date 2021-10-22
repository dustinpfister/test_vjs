let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
stat = promisify(fs.stat),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);


let startPath = process.argv[2] || process.cwd(),
filePath = '';

// try to get the stat of the given path
stat(startPath)
// if error with given path try again with cwd
.catch((e) => {
    startPath = process.cwd();
    console.warn('Error with the given path:');
    console.warn(e.message); 
    console.warn('defaulting to cwd at: ' + startPath);
    return stat(startPath);
})
// we should now have a stat object
.then((statObj) => {
    // if dir append conf.json
    if(statObj.isDirectory()){
        return Promise.resolve( path.join(startPath, 'conf.json') );
    }
    // if file just resolve to absolute path if not all ready
    return Promise.resolve( path.resolve(startPath) );
})
// we should not have a final file path to use, try to read it
.then((fp) => {
    filePath = fp;
    return readFile(filePath);
})
// error reading the file?
.catch((e) => {
    return Promise.resolve('{count:0}');
})
// we should have json text
.then((text) => {
    try{
        return JSON.parse(text);
    }catch(e){
        return { count:0 }
    }
})
// we should now have an object step count and write
.then((obj) => {
    obj.count += 1;
    return writeFile(filePath, JSON.stringify(obj), 'utf8')
})
.then(() => {
    console.log('updated file at : ' + filePath)
})
.catch((e) => {
    console.warn(e.message);
});




