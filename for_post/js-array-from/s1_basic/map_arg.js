var obj = {
    0: 2,
    1: 4,
    2: 6,
    length: 3
};
var mapper = function (el, key) {
    return key + '_' + el + '_' + this.x;
};
var arr = Array.from(obj, mapper, {x: 42});
console.log(arr);
// [ '0_2_42', '1_4_42', '2_6_42' ]
