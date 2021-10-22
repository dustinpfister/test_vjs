let fs = require('fs');

new Promise((resolve, reject) => {
    let uri = process.argv[2]; 
    if(!uri){
        reject(new Error('ENOURI: no path to file given as first positonal argument.'));
    }else{
        fs.readFile(uri, 'utf8', (e, data) => {
            if(e){
                reject(e);
            }
            resolve(data);
        });
    }
})
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.message);
})