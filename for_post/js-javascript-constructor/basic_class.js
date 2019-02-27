
class Foo {

    constructor(foo, bar) {
        this.foo = foo;
        this.bar = bar;
    }
    foobar() {
        return this.foo + '-' + this.bar;
    }

};

//Foo.prototype.foobar = function () {};

let foo = new Foo('foo', 'bar');
console.log(foo.foobar()); // 'foo-bar'
