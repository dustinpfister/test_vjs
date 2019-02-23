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
 
setInterval(heavy, 100);
setInterval(notHeavy, 100);
