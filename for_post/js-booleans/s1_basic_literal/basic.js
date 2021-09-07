// logging boolean
var logging = true;
// log function that will only log if logging is true
var log = function (mess) {
    if (logging) {
        console.log(mess);
    }
};
// only foo will log
log('foo');
logging = false;
log('bar');