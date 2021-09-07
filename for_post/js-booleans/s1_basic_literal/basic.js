var logging = true;

var log = function (mess) {
    if (logging) {
        console.log(mess);
    }
};

log('foo');
logging = false;
log('bar');