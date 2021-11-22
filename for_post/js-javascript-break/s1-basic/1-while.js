let arr = [3, 'foo', 4],
i = arr.length;
while (i--) {
    if (typeof arr[i] === 'string') {
        break;
    }
}
console.log(i, arr[i]); // 1 'foo'
