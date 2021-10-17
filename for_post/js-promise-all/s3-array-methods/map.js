let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}

// an array of times
let times = [10, 1500, 100, 75, 33, 150];
// using array.map to create a new array of promises
// my calling delayed method for each element in times array
Promise.all(times.map((ms) => {
    return delayed(ms);
}))
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
