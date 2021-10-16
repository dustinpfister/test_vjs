new Promise(function (resolve, reject) {
    resolve('foo');
})
.then(function (str) {
    console.log(str);
});
