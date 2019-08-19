var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    setTimeout(function () {
        console.log(arr[i]);
    }, 1000);

} while (i < len - 1);
// 4
// 4
// 4
// 4
