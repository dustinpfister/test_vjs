class Foo {
    constructor(foo, bar) {
        this.foo = foo;
        this.bar = bar;
    }
    foobar() {
        return this.foo + '-' + this.bar;
    }

};
 
let foo = new Foo('foo', 'bar');
console.log(foo.foobar()); // 'foo-bar'
console.log(foo.hasOwnProperty('foobar')); // false