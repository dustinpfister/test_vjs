var obj = {
    mess: 'foo',
    get foo() {
        return '(' + this.mess + ')';
    }
};

console.log(obj.foo);
// '(foo)'