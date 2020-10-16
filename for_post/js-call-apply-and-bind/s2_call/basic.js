// an Object
var pt = {
    a: 2,
    b: 3,
    // a simple add method of this object
    // that uses the this keyword to refer to
    // properties of the object
    add: function () {
        return this.a + this.b;
    }
};
// just calling the add method
console.log(pt.add()); // 5
// using Call to use the add method with another object
console.log(pt.add.call({
        a: 1,
        b: 1
    })); // 2
