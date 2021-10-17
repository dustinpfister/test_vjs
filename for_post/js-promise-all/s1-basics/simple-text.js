Promise.all(['Hello', 'world'])
.then((array) => {
    console.log(array.join(' '));
})
.catch((e) => {
    console.warn(e.message);
});
