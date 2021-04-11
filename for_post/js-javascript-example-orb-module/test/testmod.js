let path = require('path')

// PRIVATE helpers and values

let EOL = '\n';

let colors = {
   black: '\u001b[30m',
   red: '\u001b[31m',
   green: '\u001b[32m',
   orange: '\u001b[33m',
   cyan: '\u001b[36m',
   white: '\u001b[37m',
   reset: '\u001b[39m'
};

// build in log method
let log = (mess, type, bool) => {
    let out = mess;
    if(type === 'info'){
        out = colors.cyan + out + colors.reset + EOL;
    }
    if(type === 'result'){
        out = '    ' + colors.orange + out + colors.reset + EOL;;
    }
    if(type === 'result.pass' && typeof bool === 'boolean'){
        out = '    ' + (bool === true ? colors.green : colors.red) + out + colors.reset + EOL;;
    }
    if(type === 'space'){
        out = EOL;
    }
    process.stdout.write(out);
};

// parse options
let parseOptions = (opt) => {
    opt = opt || {}
    opt.dir_lib = opt.dir_lib || path.resolve(__dirname, '../lib'),
    opt.name_mod = opt.name_mod || 'utils',
    opt.name_method = opt.name_method || 'GCD',
    opt.tests = opt.tests || [{  
        args: [5, 10],
        exspect : 5
    }];
    opt.log = opt.log || log;
    // built in test function
    opt.testFunction = opt.testFunction || function(result, exspect, testObj, opt) {
        if(typeof exspect === 'number' || typeof exspect === 'string' || typeof exspect === 'boolean' ){
            return exspect === result;
        }
        if(typeof exspect === 'object'){
            if(exspect instanceof Array){
                return result.join() === exspect.join();
            }
        }
        return false;
    };
    return opt;
};

// PUBLIC API
let api = {};

// run test method
api.runTest = (opt) => {
    // parse options
    opt = parseOptions(opt);
    // preform the test
    let mod = require( path.resolve(opt.dir_lib, opt.name_mod + '.js') ),
    method = mod[opt.name_method],
    log = opt.log;
    log('', 'space');
    log('module: ' + opt.name_mod, 'info');
    log('method: ' + opt.name_method, 'info');
    opt.tests.forEach((testObj) => {
        var testResult = method.apply(null, testObj.args),
        pass = opt.testFunction(testResult, testObj.exspect, testObj, opt);
        log('', 'space');
        log('args: ' + testObj.args, 'result');
        log('exspect | result: ' + testObj.exspect + ' | ' + testResult, 'result');
        log('pass: ' + pass, 'result.pass', pass );
    });
    log('', 'space');
};

// export api
module.exports = api;

