// if you find yourself doing this
let justGiveAResolvedPromise = (obj) => {
    obj = obj || {};
    return new Promise((resolve) => {
        resolve(obj)
    })
};

justGiveAResolvedPromise({
    mess: 'we are good'
})
.then((obj) => {
    console.log(obj.mess);
});

// You Could just do this with Promise.reject
Promise.resolve({
    mess: 'we are good'
})
.then((obj) => {
    console.log(obj.mess);
});
