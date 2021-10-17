// a delayed function that returns a promise
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}

let times = [10, 1500, 100, 75, 33, 150];

Promise.all(times.map((ms) => {
    return delayed(ms);
}))
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
