var container = document.getElementById('container');

// when focusout and focusin are attached to the container
// of an input element they will work because of bubbling
container.addEventListener('focusout', function (e) {
    e.target.value = 'focus out';
});
container.addEventListener('focusin', function (e) {
    e.target.value = 'has focus';
});

// blur will not fire when attached to a div container
// because the blur event does not bubble
container.addEventListener('blur', function (e) {
    console.log('will not fire on blur');
});

// blur will only work if it is attached to the input
// element directly
document.getElementById('foo')
.addEventListener('blur', function (e) {
    console.log('will fire on blur');
});