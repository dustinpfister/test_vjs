let util = require('util'),
path = require('path'),
fs = require('fs');

let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);
let readFile = util.promisify(fs.readFile);

let dir = path.resolve(process.argv[2] || process.cwd());
readdir(dir)
.then((files) => {
    return Promise.all(files.map((file) => {
            return stat(path.join(dir, file));
        }))
})
.then((stats)=>{
	
	console.log(stats);
	
})

/*
//util.promisify(fs.readdir)('./');
//util.

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
*/
