let obj = {
    a: 1,
    b: 2,
    c: 3
};

Object.keys(obj).forEach((key, i, arr) => {
    console.log(key, i, obj[key], arr[i]);
});
/*
a 0 1 a
b 1 2 b
c 2 3 c
*/
