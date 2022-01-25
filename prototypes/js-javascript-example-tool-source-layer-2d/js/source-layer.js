var sourceLayer = (function(){

    // public api
    var api = {
       ver: 'r1'
    };

    var ON_IMAGE_LOAD = function(source){};
    var ON_UPDATE = function(source){};

    var MODES = {};

    MODES.center = {
        controls: ['zoom', 'rotation'],
        update: function(source){
            source.sx = 0;
            source.sy = 0;
            source.sw = source.image.width;
            source.sh = source.image.height;
            source.dx = source.canvas.width / 2;
            source.dy = source.canvas.height / 2;
            source.dw = source.sw;
            source.dh = source.sh;
        }
    };

    MODES.custom = {
        controls: ['zoom', 'rotation', 'dx', 'dy', 'dw', 'dh'],
        update: function(){

        }
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

    var update = function(source){
        var modeObj = MODES[source.mode];
        modeObj.update(source);
    };

    api.create = function(opt){
        opt = opt || {};
        var source = {
            mode: 'center',
            canvas: null,
            ctx: null,
            zoom: 1,
            radian: 0,
            image: null,
            sx: 0, sy: 0, sw: 100, sh: 100, dx: 0, dy: 0, dw: 100, dh: 100,
            onImageLoad: opt.onImageLoad || ON_IMAGE_LOAD,
            onUpdate: opt.onUpdate || ON_UPDATE
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

    var UI_HTML = '<span>Background Image:</span><br>' +
                '<input id=\"ui-background-image\" type=\"file\"><br><br>' +
                '<input id=\"ui-background-zoom\" type=\"range\" value=\"1\" min=\"0\" max=\"4\" step=\"0.05\">' +
                '<span>Zoom</span><br>' +
                '<input id=\"ui-background-rotation\" type=\"range\" value=\"0\" min=\"0\" max=\"1\" step=\"0.01\">' +
                '<span>Rotation</span><br>';

    api.createSourceUI = function(source, mountEl){
        var el = resolveElRef(mountEl);
        el.innerHTML = UI_HTML;
        sourceLayer.appendImageHandler(source, '#ui-background-image');
        sourceLayer.appendZoomHandler(source, '#ui-background-zoom');
        sourceLayer.appendRotationHandler(source, '#ui-background-rotation');
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
                    source.onImageLoad.call(source, source);
                    update(source);
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