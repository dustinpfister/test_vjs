var Stack = function (a) {
    this.a = a || [];
};

Stack.prototype.toString = function () {
    return this.a.map(function (obj) {
        return '{x:' + obj.x + ',y:' + obj.y + '}';
    }).join(',');
};

Stack.prototype.valueOf = function () {
    return this.a.reduce(function (acc, el) {
        if (typeof el === 'number') {
            return acc += el;
        }
        if (typeof el === 'object' && el != null) {
            return acc += Object.values(el).reduce(function (acc, el) {
                return typeof el === 'number' ? acc += el : acc;
                acc;
            }, 0);
        }
        return acc;
    }, 0);
};

var s = new Stack([1, [ 1, 1], { x: 3 }]);

console.log(s.valueOf()); // 6
