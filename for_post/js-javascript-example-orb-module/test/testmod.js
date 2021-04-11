let path = require('path')

let log = (mess) => {
    console.log(mess);
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
        log('pass: ' + ( testObj.exspect === testResult ) );
    });
};

module.exports = api;

