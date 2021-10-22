let fs = require('fs'),
promisify = require('util').promisify;

fs.promises = fs.promises || {};
fs.promises.readFile = fs.promises.readFile || promisify(fs.readFile);

fs.promises.readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code || '', ' : ', e.message);
});