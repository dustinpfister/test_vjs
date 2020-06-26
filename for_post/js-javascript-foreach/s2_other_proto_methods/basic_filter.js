let arr = [7, 'foo', 13, 'bar', false, -15, null, NaN, 120, 20];

arr = arr.filter((el) => {
        return typeof el === 'number' && String(el) != 'NaN' && el >= 0 && el <= 100;
    });

console.log(arr);
// [ 7, 13, 20 ]
