var Foo = function (a, b) {
    this.a = a;
    this.b = b;
    this.c = this.a + this.b;
};

Foo.prototype.toString = function () {
    return this.a + ' + ' + this.b + ' = ' + this.c;
};


var a = new Foo(1, 1);
console.log( a + '' ); // '1 + 1 = 2'