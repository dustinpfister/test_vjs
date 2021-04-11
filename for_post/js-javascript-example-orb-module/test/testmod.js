let path = require('path')

let colors = {
   black: '\u001b[30m',
   red: '\u001b[31m',
   green: '\u001b[32m',
   white: '\u001b[37m',
   reset: '\u001b[39m'
};

let log = (mess, bool) => {
    let out = mess;
    if(typeof bool === 'boolean'){
        out = (bool === true ? colors.green : colors.red) + out + colors.reset;
    }
    console.log(out);
};

let api = {};

// run test method
api.runTest = (opt) => {
    opt = opt || {}
    opt.dir_lib = opt.dir_lib || path.resolve(__dirname, '../lib'),
    opt.name_mod = opt.name_mod || 'utils',
    opt.name_method = opt.name_method || 'GCD',
    opt.tests = opt.tests || [{  
        args: [5, 10],
        exspect : 5
    }];
    let mod = require( path.resolve(opt.dir_lib, opt.name_mod + '.js') );
    let method = mod[opt.name_method];
    log('module: ' + opt.name_mod);
    log('method: ' + opt.name_method);
    opt.tests.forEach((testObj) => {
        var testResult = method.apply(null, testObj.args);
        log('');
        log('args: ' + testObj.args);
        log('exspect | result: ' + testObj.exspect + ' | ' + testResult);
        var pass = ( testObj.exspect === testResult);
        log('pass: ' + pass, pass );
    });
};

module.exports = api;

