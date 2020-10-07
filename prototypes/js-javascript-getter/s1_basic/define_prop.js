var obj = {
    mess: 'foo'
};

Object.defineProperty(obj, 'foo', {
    get: function () {
        return this.mess;
    }
});

console.log(obj.foo);
// '(foo)'
