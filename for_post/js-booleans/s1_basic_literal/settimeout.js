var firstRun = true;
var loop = function () {
    setTimeout(loop, 1000);
    if (firstRun) {
        console.log('first run!');
        firstRun = false;
    }
    console.log('tick');
}
loop();