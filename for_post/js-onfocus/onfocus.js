// get a reference to the element
var el = document.getElementById('foo');
// a single focus event can be attached this way
el.onfocus = function (e) {
    console.log(e);
};
// attaching two or more will require the use of addEventListener
el.addEventListener('focus', function () {
    console.log('foo');
});
