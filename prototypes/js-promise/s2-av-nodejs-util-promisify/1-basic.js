// requiring in the file system module
let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code, ' : ', e.message);
});
