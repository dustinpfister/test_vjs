let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}

// an array of times
let times = [10, 1500, 33, 7500, 3000, 150];
// filtering out times over 1000, and then using map
Promise.all(times.filter((ms) => {
    return ms < 1000;
}).map((ms) => {
    return delayed(ms);
}))
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
