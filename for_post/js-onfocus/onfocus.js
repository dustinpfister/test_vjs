
// a single focus event can be attached this way
var onfocus = function (e) {
    console.log(e);
};

// attaching two or more will require the use of addEventListener
document.getElementById('foo').addEventListener('focus', function () {
    console.log('foo');
});
