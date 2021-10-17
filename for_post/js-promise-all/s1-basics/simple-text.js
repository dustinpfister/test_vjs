Promise.all(['Hello', 'world'])
.then((array) => {
    console.log('all good');
})
.catch((e) => {
    console.log(e.message);
});
