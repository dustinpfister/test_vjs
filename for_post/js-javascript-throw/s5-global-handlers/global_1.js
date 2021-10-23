// loop using setInterval
let count = 5;
let t = setInterval(function () {
        count -= 1;
        console.log('count: ' + count);
        if (count === 0) {
            clearInterval(t);
        }
    }, 1000);
// Throwing an error will cause the script to stop working
// the console.log below will not print, and on top of it the loop
// above will not work also
throw new Error('Throwing an error outside of any try');
console.log('This will not print');
