// set-timeout brings a kind of pseudo-parallelism
// however it is a kind of async feature in the sense
// that it is a way to set a function to happen at a different time in the future

// doing something
console.log('tick1');

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

setTimeout(heavy, 100)

// doing something else finally after
// doing something that will take a while
console.log('tick2')
