var sourceLayer = (function(){

    var ON_IMAGE_LOAD = function(source){
        source.sx = 0;
        source.sy = 0;
        source.sw = source.image.width;
        source.sh = source.image.height;
        source.dx = 0;
        source.dy = 0;
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

    var draw = function(source){
        var canvas = source.canvas,
        ctx = source.ctx;
        // clear source layer
        ctx.clearRect(-1, -1 , canvas.width + 2, canvas.height + 2);
        // draw source image to layer with current settings
        ctx.drawImage(source.image, source.sx, source.sy, source.sw, source.sh, source.dx, source.dy, source.dw, source.dh);

//ctx.drawImage(source.image, 0, 0)



//ctx.fillStyle = 'black';
//ctx.fillRect(0,0, 100, 100);

    };

    var api = {};

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
        source.canvas = resolveElRef(opt.canvas);
        if(source.canvas){
            source.canvas.width = opt.width;
            source.canvas.height = opt.height;
            source.ctx = source.canvas.getContext('2d');
        }
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


    return api;

}());