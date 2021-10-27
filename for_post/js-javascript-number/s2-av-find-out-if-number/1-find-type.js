let arr = ['foo', 42, null, NaN, 16, {}, 0, -1];
arr = arr.filter((el) => {
        return typeof el === 'number';
    });
console.log(arr);
// [ 42, NaN, 16, 0, -1 ]