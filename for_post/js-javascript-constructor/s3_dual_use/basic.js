var Foo = function (x, y) {
    console.log(this.constructor.name);
};

Foo();
// 'object'
new Foo();
// 'Foo'