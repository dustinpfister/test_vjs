var sourceLayer = (function(){

    var api = {};

    api.create = function(opt){
        opt = opt || {};
        var source = {
            canvas: opt.canvas || null,
            ctx: null,
            zoom: 1,
            radian: 0,
            image: null,
            sx: 0, sy: 0, sw: 32, sh: 32, sx: 0, dx: 0, dw: 32, dh: 32
        };
        if(opt.canvas){
            opt.ctx = opt.canvas.getContext('2d');
        }
        return source;

    };


    return api;

}());