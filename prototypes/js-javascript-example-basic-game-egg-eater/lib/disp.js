(function(api){

    api.createDisp = function(opt){
        opt = opt || {};
        var obj = {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w || 32,
            h: opt.h || 32,
            heading : opt.heading === undefined ? Math.PI * 0.5 : opt.heading,
            pps: opt.pps || 128
        };
        obj.hw = obj.w / 2;
        obj.hh = obj.h / 2;
        obj.cx = obj.x + obj.hw;
        obj.cy = obj.y + obj.hh;
        obj.fill = opt.fill || 'gray';
        obj.active = true;
        return obj;
    };

    api.createPool = function(opt){
         opt = opt || {};
         var pool = {
             count: opt.count || 10,
             disp: []
         };
         var i = 0;
         while(i < pool.count){
             var disp = api.createDisp();
             disp.active = false;
             pool.disp.push(disp);
             i += 1;
         };
         return pool;
    };


}(this['dispMod'] = {}));