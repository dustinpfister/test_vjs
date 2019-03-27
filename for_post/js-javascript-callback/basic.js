var delay = function (delay, cb) {
    delay = delay === undefined ? 0 : delay;
    cb = cb === undefined ? function () {}: cb;
    return setTimeout(cb, delay);
};

// 'no delay logs first'
delay(1000, function(){
    console.log('delay');
});
console.log('no delay')
