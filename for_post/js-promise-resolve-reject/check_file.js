let fs = require('fs'),
promisify = require('util').promisify;

let stat = promisify(fs.stat),
readFile = promisify(fs.readFile);

// get stats of path
stat(process.argv[2] || process.cwd())

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

.then((stats)=>{
	
	console.log('okay');
	console.log(stats);
	
})

.catch((e) => {
    console.log(e.message);
});
