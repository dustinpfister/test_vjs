
(function(api){
    // create a canvas element
    api.createCanvas = function (opt) {
        opt = opt || {};
        opt.container = opt.container || document.getElementById('canvas-app') || document.body;
        opt.canvas = document.createElement('canvas');
        opt.ctx = opt.canvas.getContext('2d');
        // assign the 'canvas_example' className
        opt.canvas.className = 'canvas_example';
        // set native width
        opt.canvas.width = opt.width === undefined ? 320 : opt.width;
        opt.canvas.height = opt.height === undefined ? 240 : opt.height;
        // translate by 0.5, 0.5
        opt.ctx.translate(0.5, 0.5);
        // disable default action for onselectstart
        opt.canvas.onselectstart = function () {
            return false;
        }
        // append canvas to container
        opt.container.appendChild(opt.canvas);
        return opt;
    };
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
}(this['canvasMod'] = {}));