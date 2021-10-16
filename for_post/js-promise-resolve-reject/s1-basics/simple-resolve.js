Promise.resolve('foo')
.then(function (str) {
    console.log(str);
})
.catch(function (e) {
    console.warn(e);
});
// 'foo'
