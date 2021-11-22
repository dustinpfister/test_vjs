let arr = [
    3,
    [2, 3, 0, 5, 7],
    'foo',
    ['bar', 8, 8],
    [3, 22, false],
    [8]
];

let sum = 0,
el,
ia = 0,
ib;

outer: while (ia < arr.length) {
    el = arr[ia];
    if (el instanceof Array) {
        ib = 0;
        inner: while (ib < el.length) {
            if (typeof el[ib] === 'number') {
                sum += el[ib];
            } else {
                break inner;
            }
            ib += 1;
        }
    }
    ia += 1;
}

console.log(sum);