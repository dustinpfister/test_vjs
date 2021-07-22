// a constructor function to create a class of an object
var Stack = function (a) {
    this.a = a || [];
};
// the to string method is used to define what a string value should be for
// this class of an object
Stack.prototype.toString = function () {
    return this.a.map(function (el) {
        // if el is a number
        if (typeof el === 'number') {
            return String(el);
        }
        // if object
        if (typeof el === 'object' && el != null) {
            return Object.keys(el).map(function (key) {
                return key + ':' + el[key];
            }).join(',');
        }
        // string null for null
        if (el === null) {
            return 'null';
        }
        // string of undefined for undefined
        if (el === undefined) {
            return 'undefined';
        }
        // default to just calling whatever the toString method is
        return el.toString();
    }).join(',');
};
// value of is used to define what a number value should be for this
// class of object
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

var s = new Stack([null, undefined, 1, [1, 1], {
                x: 3
            }
        ]);
console.log(s.toString());
console.log(s.valueOf()); // 6
