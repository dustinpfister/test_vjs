// set interval and set timeout might be async in nature
// but by using them you are still working within the same
// execution context. So it is still possible for one process
// to be blocked by another if one is doing something heavy

// doing something that will take a while
var heavy = function () {
    var i = Math.pow(2, 30),
    st = new Date();
    while (i--) {
        if (i === 0) {
            console.log('done: ' + (new Date() - st));
        }
    }
};
 
var notHeavy = function () {
    console.log('tick');
}
 
setInterval(heavy, 1000);
setInterval(notHeavy, 100);

// setting the delay to 100ms for notHeavy will not always result in
// the method executing at that frequency. If another method that is doing
// some heavy lifting of some kind is executing in the same event loop, the
// not heavy method will be delayed.