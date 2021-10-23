

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

// Throwing an error
throw new Error('Throwing an error outside of any try');
console.log('This will not print');
