var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    (function (n) {
        setTimeout(function () {
            console.log(arr[n]);
        }, 1000);
    }
        (i));
} while (i < len - 1);
