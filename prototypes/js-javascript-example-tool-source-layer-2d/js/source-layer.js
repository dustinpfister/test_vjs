var sourceLayer = (function(){

    var api = {
       ver: 'r1'
    };

    var ON_IMAGE_LOAD = function(source){
        source.sx = 0;
        source.sy = 0;
        source.sw = source.image.width;
        source.sh = source.image.height;
        source.dx = source.canvas.width / 2;
        source.dy = source.canvas.height / 2;
        source.dw = source.sw;
        source.dh = source.sh;
    };

    var resolveElRef = function(elRef){
        if(typeof elRef === 'object' && elRef != null){
            return elRef
        }
        if(typeof elRef === 'string'){
            return document.querySelector(elRef);
        }
        return null
    };

    var drawPlaceHolder = function(ctx, x, y, w, h){
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.rect(x ,y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.stroke();
    };

    var draw = function(source){
        var canvas = source.canvas,
        ctx = source.ctx;
        // clear source layer
        ctx.clearRect(-1, -1 , canvas.width + 2, canvas.height + 2);
        // draw source image to layer with current settings
        ctx.save();
        ctx.translate(source.dx, source.dy);
        ctx.rotate(source.radian);
        var w = source.dw * source.zoom,
        h = source.dh * source.zoom,
        x = w / 2 * -1,
        y = h / 2 * -1;
        if(source.image){
            ctx.drawImage(source.image, source.sx, source.sy, source.sw, source.sh, x, y, w, h);
        }else{
           drawPlaceHolder(ctx, x, y, w, h);
        }
        ctx.restore();
    };

    api.create = function(opt){
        opt = opt || {};
        var source = {
            canvas: null,
            ctx: null,
            zoom: 1,
            radian: 0,
            image: null,
            sx: 0, sy: 0, sw: 100, sh: 100, dx: 0, dy: 0, dw: 100, dh: 100,
            onImageLoad: opt.onImageLoad || ON_IMAGE_LOAD,
            onUpdate: opt.onUpdate || function(source){}
        };
        var canvas = source.canvas = resolveElRef(opt.canvas);
        if(canvas){
            canvas.width = opt.width;
            canvas.height = opt.height;
            source.ctx = canvas.getContext('2d');
            // values for placeholder
            source.dx = canvas.width / 2;
            source.dy = canvas.height / 2;
            source.dw = 320;
            source.dh = 240;
        }
        draw(source);
        return source;

    };

    // append image hander
    api.appendImageHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('change', function(e){
            var files = e.target.files,
            file = files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                var img = source.image = new Image();
                img.src = reader.result;
                img.addEventListener('load', function(){
                    source.onImageLoad.call(source, source)
                    draw(source);
                    source.onUpdate.call(source, source);
                });
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    };

    // zoom hander
    api.appendZoomHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('input', function(e){
            source.zoom = e.target.value
            draw(source);
            source.onUpdate.call(source, source);
        });
    };

    // rotation
    api.appendRotationHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('input', function(e){
            source.radian = Math.PI * 2 * (parseFloat(e.target.value) / 1);
            draw(source);
            source.onUpdate.call(source, source);
        });
    };


    return api;

}());