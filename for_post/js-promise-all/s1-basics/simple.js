let delayed = (ms) => {
    return new Promise((resolve, reject) => {
		let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}

Promise.all([delayed(10), delayed(1500)])
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
