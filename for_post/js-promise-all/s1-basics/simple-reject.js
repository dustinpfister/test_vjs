let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            let t = new Date() - st;
            if (t >= 1000) {
                reject(new Error('process took to long'))
            }
            resolve(t);
        }, ms || 1000)
    });
}
Promise.all([delayed(10), delayed(985)])
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
