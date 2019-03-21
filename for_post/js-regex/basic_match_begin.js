let data = ['foobar', 'baz', 'foo'];

data.forEach(function (str,i) {
    var beginFoo = str.match(/^foo/);
    if (beginFoo) {
        console.log(i,beginFoo.index);
    }
});
// 0 0
// 2 0
