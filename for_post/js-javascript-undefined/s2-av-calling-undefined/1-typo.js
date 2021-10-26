var obj = {
    foo: function () {
        return 'bar';
    }
};
// calling obj.foo
console.log(obj.foo()); // bar
// calling obj.Foo with an uppercase F
try {
    obj.Foo();
} catch (e) {
    console.log(e.message); //obj.Foo is not a function
}

