var func1 = function () {
    var self = this;
    self.x = self.x === undefined ? 5 : self.x;
    return function (dx) {
        return self.x + dx;
    };
};

console.log( func1()(40)); // 45
console.log( func1.call({x:2})(2)); // 4

var func2 = () => {
    this.x = this.x === undefined ? 5 : this.x;
    return (dx) => {
        return this.x + dx;
    };
};


console.log( func2()(40)); // 45
console.log( func2.call({x:2})(2)); // 7