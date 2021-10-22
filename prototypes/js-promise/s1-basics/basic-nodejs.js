// requiring in the file system module
let fs = require('fs');
// usning the Promise constructor as a way to create a promise
new Promise((resolve, reject) => {
    let uri = process.argv[2];
    // reject if not URI to a file is given
    if(!uri){
        reject(new Error('ENOURI: no path to file given as first positonal argument.'));
    }else{
        // if we have a given uri try to read it
        fs.readFile(uri, 'utf8', (e, data) => {
            // if we have an error reject passing that error object
            if(e){
                reject(e);
            }else{
                // else resolve with what should be the data of the file
                resolve(data);
            }
        });
    }
})
// then if all goes well
.then((data)=>{
    console.log(data);
})
// if any error happens we will end up here
// and the above then call will not fire
.catch((e) => {
    console.warn(e.message);
});
