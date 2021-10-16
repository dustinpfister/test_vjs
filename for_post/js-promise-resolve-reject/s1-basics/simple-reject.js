Promise.reject(new Error('No Good'))
.then(function (str) {
    console.log(str);
})
.catch(function (e) {
    console.warn(e.message);
});
// 'No Good'
