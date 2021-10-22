let fs = require('fs'),
promisify = require('util').promisify,
stat = promisify(fs.stat),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);