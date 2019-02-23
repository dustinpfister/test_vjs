// doing something
console.log('tick1');

// doing something that will take a while
var i = Math.pow(2, 30),
st = new Date();
while (i--) {
    if (i === 0) {
        console.log('done: ' + ( new Date() - st ));
    }
}

// doing something else finally after
// doing something that will take a while
console.log('tick2')
