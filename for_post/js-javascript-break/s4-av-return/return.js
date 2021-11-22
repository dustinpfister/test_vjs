let arr = [3, 'foo', 4],
getFirstString = (arr) => {
    let i = arr.length;
    while (i--) {
        if (typeof arr[i] === 'string') {
            return {
                i: i,
                str: arr[i]
            }
        }
        console.log(i, arr[i]);
        // 2 4
        // 1 'foo'
    }
},
a = getFirstString(arr);
console.log(a.i, a.str); // 1 'foo'
