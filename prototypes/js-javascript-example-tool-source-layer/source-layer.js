var sourceLayer = (function(){

    var resolveElRef = function(elRef){
        if(typeof elRef === 'object' && elRef != null){
            return elRef
        }
        if(typeof elRef === 'string'){
            return document.querySelector(elRef);
        }
        return null
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
            sx: 0, sy: 0, sw: 32, sh: 32, sx: 0, dx: 0, dw: 32, dh: 32,
            onUpdate: opt.onUpdate || function(source){}
        };
        source.canvas = resolveElRef(opt.canvas);
        if(source.canvas){
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