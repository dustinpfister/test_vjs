// async function that does something heavy
let heavyAsync = async function () {
    var i = Math.floor(Math.pow(10, 9.25)),
    st = new Date();
    while (i--) {}
    var secs = (new Date() - st) / 1000;
    console.log('');
    console.log('heavy time: ', secs.toFixed(2));
    console.log('');
};
// loop
let i = 0,
lt = new Date();
let loop = function () {
    setTimeout(loop, 250);
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    if (i % 10 === 5) {
        heavyAsync();
    }
    console.log('tick' + i, ' time: ' + secs.toFixed(2));

    i += 1;
};

loop();
