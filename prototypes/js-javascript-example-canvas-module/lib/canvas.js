
(function(api){

    // create a single layer object
    var createLayer = function(opt){
        opt = opt || {};
        opt.append = opt.append === undefined ? true : false;
        var layer = {};
        // a layer should have a container
        layer.container = opt.container || document.getElementById('canvas-app') || document.body;
        if(typeof layer.container === 'string'){
            layer.container = document.querySelector(layer.container);
        }
        layer.canvas = document.createElement('canvas');
        layer.ctx = layer.canvas.getContext('2d');
        // assign the 'canvas_layer' className
        layer.canvas.className = 'canvas_layer';
        // set native width
        layer.canvas.width = opt.width === undefined ? 320 : opt.width;
        layer.canvas.height = opt.height === undefined ? 240 : opt.height;
        // translate by 0.5, 0.5
        layer.ctx.translate(0.5, 0.5);
        // disable default action for onselectstart
        layer.canvas.onselectstart = function () {
            return false;
        }
        // append canvas to container
        if(opt.append){
            layer.container.appendChild(layer.canvas);
        }
        return layer;
    };

    // create just a single layer object
    api.createLayer = function (opt) {
         return createLayer(opt);
    };

    // create a stack of layers as an 'Array Like' Object
    api.createLayerStack = function (opt) {
         opt = opt || {};
         // createing an array like object
         var stack = {
             append: opt.append === undefined ? true : false,
             length: opt.length === undefined ? 2 : opt.length,
             container: opt.container || document.getElementById('canvas-app') || document.body
         };
         if(typeof stack.container === 'string'){
            stack.container = document.querySelector(stack.container);
         }
         // append
         if(opt.append){
            stack.container.appendChild(stack.canvas);
         }
         // layer options
         var layerOpt = {
             container: stack.container,
             append: true
         };
         // create layers for the stack
         var i = 0;
         while(i < stack.length){
             stack[i] = createLayer(layerOpt);
             i += 1;
         }
         return stack;
    };

/*
    // get a canvas relative position that is adjusted for scale
    api.getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        pos = {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
        // adjust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return pos;
    };
    // create and return a canvas pointer event handler
    api.canvasPointerEventHandler = function (state, events) {
        return function (e) {
            var pos = api.getCanvasRelative(e),
            handler = null;
            e.preventDefault();
            if (e.type === 'mousedown' || e.type === 'touchstart') {
                handler = events['pointerStart'];
            }
            if (e.type === 'mousemove' || e.type === 'touchmove') {
                handler = events['pointerMove'];
            }
            if (e.type === 'mouseup' || e.type === 'touchend') {
                handler = events['pointerEnd'];
            }
            if (handler) {
                handler.call(e, e, pos, state);
            }
        };
    };
    // attach canvas pointer events
    api.canvasPointerEvents = function (canvas, state, events) {
        var handler = api.canvasPointerEventHandler(state, events),
        options = {
            passive: false
        }
        canvas.addEventListener('mousedown', handler, options);
        canvas.addEventListener('mousemove', handler, options);
        canvas.addEventListener('mouseup', handler, options);
        canvas.addEventListener('touchstart', handler, options);
        canvas.addEventListener('touchmove', handler, options);
        canvas.addEventListener('touchend', handler, options);
    };
*/
}(this['canvasMod'] = {}));