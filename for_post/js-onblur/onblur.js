var foo = document.getElementById('foo');

foo.addEventListener('blur', function (e) {
    e.target.value = 'blur out';
});
foo.addEventListener('focus', function (e) {
    e.target.value = 'has focus';
});

/*

var forBlur = function (e) {
    console.log(e.target.id + ' blur');
};

var forFocus = function (e) {
    console.log(e.target.id + ' focus');
};

var foo = document.getElementById('foo');
foo.addEventListener('blur', forBlur);
foo.addEventListener('focus', forFocus);

var bar = document.getElementById('bar');
bar.addEventListener('blur', forBlur);
bar.addEventListener('focus', forFocus);
*/