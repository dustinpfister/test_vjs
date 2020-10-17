var container = document.getElementById('container'),
out = document.getElementById('out');

// when focusout and focusin are attached to the container
// of an input element they will work because of bubbling
container.addEventListener('focusout', function (e) {
    out.innerText = 'Focused out from ' + e.target.id + ' in the container';
});
container.addEventListener('focusin', function (e) {
    out.innerText = 'The ' + e.target.id + ' element is now focused in the container.';
});
