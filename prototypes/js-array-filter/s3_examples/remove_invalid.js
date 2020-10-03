var removeInvalid = function (objects) {
    return objects.filter(function (el) {
        if (typeof el != 'object' || el === null) {
            return false;
        }
        return typeof el.hp === 'number';
    });
};

var objects = [{
        hp: 10
    }, {},
    7,
    undefined,
    'foo',
    [], {
        hp: 7
    },
    null,
    NaN
];

objects = removeInvalid(objects);

console.log(objects);
// [ { hp: 10 }, { hp: 7 } ]
