var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

Array.prototype.concat.call(obj, 4, 5, [6, 7]);
