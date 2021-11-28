var arr = [0, 0, 0, 0];

var i = 0;
var loop = function () {
    setTimeout(loop, 1000);
    arr[i] = Math.random() >= 0.5 ? arr[i] - 1 : arr[i] + 1;
    arr[i] = arr[i] < -5 ? -5 : arr[i];
    arr[i] = arr[i] > 5 ? 5 : arr[i];
    console.log(arr);
    i += 1;
    i %= arr.length;
};
loop();
