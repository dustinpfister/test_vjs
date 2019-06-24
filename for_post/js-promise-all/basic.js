
let readDir = (dir) => {
    return require('util').promisify(require('fs').readdir)(dir);
};

Promise.all([true, readDir('./')])

.then((a) => {

    console.log('yeah');
    console.log(a);
})
