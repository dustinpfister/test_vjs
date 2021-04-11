let path = require('path'),
utils = require(path.resolve(__dirname, '../lib/utils.js'));

let tests = [
    {  
       args: [5, 10],
       exspect : 5
    },
    {  
       args: [10, 5],
       exspect : 5
    },
    {  
       args: [1, 7],
       exspect : 1
    }
];
let method = utils.GCD;

tests.forEach((testObj) => {
    var testResult = method.apply(null, testObj.args);
    console.log('');
    console.log('args: ' + testObj.args);
    console.log('exspect | result: ' + testObj.exspect + ' | ' + testResult);
    console.log('pass: ', testObj.exspect === testResult);
});
