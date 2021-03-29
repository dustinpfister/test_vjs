let path = require('path'),
utils = require( path.join(__dirname, 'lib/utils.js') );

var i = 10,
logOnce = utils.createLogOnce();
while(i--){
    logOnce('i=' + i);
}