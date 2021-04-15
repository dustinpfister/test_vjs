(function(api){

    api.createDisp = function(opt){
        var obj = {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w || 32,
            h: opt.h || 32
        };
        obj.hw = obj.w / 2;
        obj.hh = obj.h / 2;
        obj.cx = obj.x + obj.hw;
        obj.cy = obj.y + obj.hh;
        return obj;
    };



}(this['dispMod'] = {}));