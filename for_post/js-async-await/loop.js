// async function that does something heavy
let heavyAsync = async function () {
    var i = Math.pow(10, 9);
    while (i--) {}
    console.log('bar');
};
// loop
let i = 0, st;
let loop = function () {
    setTimeout(loop, 250);
    st = new Date();
    if (i % 10 === 5) {
        heavyAsync();
    }
    console.log('tick' + i, ' time: ' + (new Date() - st));
    i += 1;
};

loop();
