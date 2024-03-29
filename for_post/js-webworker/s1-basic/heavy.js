onmessage = function (e) {
    opt = e.data || { w: 10, h: 10 };
    var result={ sum: 0 },
    st = new Date(),
    len = opt.w * opt.h,
    i = 0;
    while(i < len){
        var x = i % opt.w,
        y = Math.floor(i / opt.w);
        result.sum += Math.pow(x, y / 1000);
        i += 1;
    }
    result.secs = parseFloat( ((new Date() - st) / 1000).toFixed(2) );
    postMessage(result);
};
