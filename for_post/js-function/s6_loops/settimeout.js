var c = 0;
var loop = function () {
    var id = setTimeout(loop, 100);
    console.log(c);
    c += 1;
    if (c >= 50) {
        clearTimeout(id);
    }
};
loop();
