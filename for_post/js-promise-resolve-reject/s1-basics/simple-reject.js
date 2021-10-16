Promise.reject(new Error('No Good'))
.catch(function (e) {
    console.warn(e.message);
});
// 'No Good'
