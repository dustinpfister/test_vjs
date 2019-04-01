let fs = require('fs');

// using readFile with a callback method
fs.readFile('basic.js', function (e, data) {
    if (e) {
        console.log(e.message);
    }
    if (data) {
        console.log(data.toString());
    }
});

// this will log first.
console.log('first!');
