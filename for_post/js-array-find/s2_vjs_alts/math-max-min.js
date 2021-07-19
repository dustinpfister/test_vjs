// and array of numbers
var a = [3, 3, 0, 12, 0, -7, 37, 2];
var max = Math.max.apply(null, a),
min = Math.min.apply(null, a);
console.log(max); // 37
console.log(min); // -7

// an array of objects
var objs = [
    {x: 0, y: 1},
    {x: 23, y: 3},
    {x: -3, y: 2},
    {x: 7, y: 4}
];
var findMaxMinProp = function(objs, prop, maxMin){
    return Math[maxMin].apply( null, objs.map(function (obj) {
        return obj[prop];
    }));
};
console.log( findMaxMinProp(objs, 'x', 'min') ); // -3
console.log( findMaxMinProp(objs, 'x', 'max') ); // 23
console.log( findMaxMinProp(objs, 'y', 'min') ); // 1
console.log( findMaxMinProp(objs, 'y', 'max') ); // 4