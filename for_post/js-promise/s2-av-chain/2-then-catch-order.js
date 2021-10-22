// 'bar' WILL NOT be appended to mess if there is an error
Promise.reject( new Error('FOOERROR') )
.then((mess) => {
    return Promise.resolve(mess + 'bar');
})
.catch((e) => {
    if(e.message === 'FOOERROR'){
        return Promise.resolve('foo');
    }
    return Promise.reject(e);
})
.then((mess)=>{
    console.log(mess); // 'foo'
});
 
// 'bar' WILL be appended to mess if there is an error
Promise.reject( new Error('FOOERROR') )
.catch((e) => {
    if(e.message === 'FOOERROR'){
        return Promise.resolve('foo');
    }
    return Promise.reject(e);
})
.then((mess) => {
    return Promise.resolve(mess + 'bar');
})
.then((mess)=>{
    console.log(mess); // 'foo'
});