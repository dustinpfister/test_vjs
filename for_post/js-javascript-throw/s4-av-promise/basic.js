new Promise(function (resolve, reject) {
    reject(new Error('Calling reject'));
})
.catch(function (e) {
    console.log(e.message); // 'Calling reject'
});

new Promise(function (resolve, reject) {
    throw new Error('Just using throw, and not calling anything.');
})
.catch(function (e) {
    console.log(e.message); // ''Just using throw, and not calling anything.''
});
