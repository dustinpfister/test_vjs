
Promise.resolve('Hello World, this is')
.then((mess) => {
    return Promise.resolve(mess + ' a Promise Chain');
})
.then((mess) => {
    console.log(mess);
});
