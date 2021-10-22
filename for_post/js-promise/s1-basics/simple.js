// method that returns a promise using the Promise construcor
let hw = (mess) => {
    return new Promise((resolve, reject) => {
        if(typeof mess === 'string' || typeof mess === 'number'){
            resolve('Hello World ' + mess);
        }else{
            let e = new Error('ENASON: mess value is not a string or number.');
            e.code = 'ENASON';
            reject(e);
        }
    })
};
// if all goes well the next then in the chain is called
hw('this is foo')
.then(function(mess){
   console.log(mess);
});
// if an error happens the next catch in the chain is called.
hw()
.catch(function(e){
   console.warn(e.code, e.message);
});
