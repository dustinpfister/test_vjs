var foo = document.getElementById('foo');

foo.addEventListener('focusout', function (e) {
    e.target.value = 'focus out';
});
foo.addEventListener('focusin', function (e) {
    e.target.value = 'focus in';
});
