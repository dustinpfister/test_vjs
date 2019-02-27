var Foo = function (foo, bar) {
    this.foo = foo;
    this.bar = bar;
};

Foo.prototype.foobar = function () {
    return this.foo + '-' + this.bar;
};

var foo = new Foo('foo','bar');
console.log(foo.foobar()); // 'foo-bar'
