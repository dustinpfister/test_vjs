let arr = [8, 3, 16, 5, 32, 7, 2, null, 4, 19];

let i = 0,
len = arr.length;
while (i < len) {

    n = arr[i];
    i += 1;
    if (typeof n != 'number') {
        break;
    }

    if (String(Math.log(n) / Math.log(2)).indexOf('.') != -1) {

        continue;

    }

    console.log(n);
    // 8 16 32 2

}
