// a delayed function that returns a promise
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}
// calling the function twice for two elements in an array, and
// passing that array to the promise all method
Promise.all([delayed(10), delayed(1500)])
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
