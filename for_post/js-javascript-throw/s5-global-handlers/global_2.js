
// setting an new uncaughtException handler to which
// I AM NOT calling process.exit
process.on('uncaughtException', (e) => {
    console.log('An Error has happend: ' + e.message);
});
// loop using setInterval
let count = 5;
let t = setInterval(function () {
        count -= 1;
        console.log('count: ' + count);
        if (count === 0) {
            clearInterval(t);
        }
    }, 1000);
// Throwing an error will cause the console.log below to not print
// but the above loop will continue until it is done.
throw new Error('Throwing an error outside of any try');
console.log('This will not print');
