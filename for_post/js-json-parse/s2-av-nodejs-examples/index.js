let fs = require('fs'),
promisify = require('util').promisify,
os = require('os'),
path = require('path'),
read = promisify(fs.readFile),
write = promisify(fs.writeFile),

fileName = '.node-json-example.json',
filePath = path.join(os.homedir(), fileName);

read(filePath)
.then((data) => {
    let obj = JSON.parse(data);
    return Promise.resolve(obj);
})
.catch((e) => {
    if (e.code === 'ENOENT') {
        return Promise.resolve({
            count: 0
        });
    }
    return Promise.reject(e);
})
.then((obj) => {
    obj.count += 1;
    console.log('count: ' + obj.count);
    return write(filePath, JSON.stringify(obj));
})
.then(() => {
    console.log('updated json file at: ' + filePath);
})
.catch((e) => {
    console.warn(e);
    console.log(e.code);
});
