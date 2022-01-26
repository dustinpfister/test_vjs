var sourceLayer = (function(){
    // public api
    var api = {
       ver: 'r2'
    };
    // hard coded values
    var ON_IMAGE_LOAD = function(source){};
    var ON_UPDATE = function(source){};
    var UI_HTML = '<span>Background:</span><br><br>' +
                'image: <input id=\"ui-background-image\" type=\"file\"><br><br>' +
                'mode: <select id=\"input-background-mode\">' +
                    '<option value=\"center\">Center</option>' +
                    '<option value=\"custom\">Custom</option>' +
                '</select><br><br>' +
                '<div id="bgui-zoom" ><input id=\"ui-background-zoom\" type=\"range\" value=\"1\" min=\"0\" max=\"4\" step=\"0.05\">' +
                '<span>Zoom</span><br></div>' +
                '<div id="bgui-rotation" >'+
                     '<input id=\"ui-background-rotation\" type=\"range\" value=\"0\" min=\"0\" max=\"1\" step=\"0.01\">' +
                     '<span>Rotation</span><br>' +
                '</div>' +
                '<div id="bgui-pos" >dx: <input id=\"ui-background-dx\" type=\"text\" size="4"> '+
                'dy: <input id=\"ui-background-dy\" type=\"text\" size="4"> <br></div>' +
                '<div id="bgui-size" >dw: <input id=\"ui-background-dw\" type=\"text\" size="4"> ' +
                'dh: <input id=\"ui-background-dh\" type=\"text\" size="4"> <br></div>';
    // back ground modes
    var MODES = {};
    // center mode
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
    // custom mode
    MODES.custom = {
        controls: ['zoom', 'rotation', 'pos', 'size'],
        update: function(){
            source.sw = source.image.width;
            source.sh = source.image.height;
        }
    };
    // get element helper
    var get = function(q){
        return document.querySelector(q);
    };
    // resolve a string to an element object, or just return what should be a element object
    var resolveElRef = function(elRef){
        if(typeof elRef === 'object' && elRef != null){
            return elRef
        }
        if(typeof elRef === 'string'){
            return document.querySelector(elRef);
        }
        return null
    };
    // draw place holder image when no image is loaded
    var drawPlaceHolder = function(ctx, x, y, w, h){
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.rect(x ,y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.stroke();
    };
    // draw the current state of a source object to the context of the source object
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
    // update a source object
    var update = function(source){
        var modeObj = MODES[source.mode];
        if(source.image){
            modeObj.update(source);
        }
    };
    // main method used to create a source object
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
    // for each control helper
    var forEachControl = function(source, el, ifOn, ifOff){
        var modeObj = MODES[source.mode];
        ['zoom', 'rotation', 'pos', 'size'].forEach(function(key){      
            var controlEl = el.querySelector('#bgui-' + key);
            if(modeObj.controls.some(function(modeKey){
                return key === modeKey;
            })){
                ifOn(source, controlEl, el, key);
            }else{
                ifOff(source, controlEl, el, key);
            } 
        });   
    };
    // display controls for just the current mode
    var displayControlsForMode = function(source, el){
        forEachControl(source, el, 
            function(source, controlEl){
                controlEl.style.visibility = 'visible';
            },
            function(source, controlEl){
                controlEl.style.visibility = 'hidden';
            }
        );
    };
    // update control values to source object
    var UpdateControlValuesForMode = function(source, el){
        get('#ui-background-zoom').value = source.zoom;
        get('#ui-background-rotation').value = source.radian / (Math.PI * 2)
        get('#ui-background-dx').value = source.dx;
        get('#ui-background-dy').value = source.dy;
        get('#ui-background-dw').value = source.dw;
        get('#ui-background-dh').value = source.dh;
    };
    // create a text input hander for props like dx dy dw and dh
    var createTextInputHander = function(source, el, key){
        return function(e){
            source[key] = e.target.value;
            update(source);
            draw(source);
            displayControlsForMode(source, el);
            UpdateControlValuesForMode(source, el);
        };
    };
    // create an HTML User Interface for the given source object and append it to the given mount point
    api.createSourceUI = function(source, mountEl){
        var el = resolveElRef(mountEl);
        el.innerHTML = UI_HTML;
        // handlers
        sourceLayer.appendImageHandler(source, '#ui-background-image');
        sourceLayer.appendZoomHandler(source, '#ui-background-zoom');
        sourceLayer.appendRotationHandler(source, '#ui-background-rotation');
        // change mode
        get('#input-background-mode').addEventListener('change', function(e){
            source.mode = e.target.value;
            update(source);
            draw(source);
            displayControlsForMode(source, el);
            UpdateControlValuesForMode(source, el);
        });
        get('#ui-background-dx').addEventListener('input', createTextInputHander(source, el, 'dx'));
        get('#ui-background-dy').addEventListener('input', createTextInputHander(source, el, 'dy'));
        get('#ui-background-dw').addEventListener('input', createTextInputHander(source, el, 'dw'));
        get('#ui-background-dh').addEventListener('input', createTextInputHander(source, el, 'dh'));
        displayControlsForMode(source, el);
        UpdateControlValuesForMode(source);
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

                    UpdateControlValuesForMode(source);

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
    // return the public API
    return api;
}());