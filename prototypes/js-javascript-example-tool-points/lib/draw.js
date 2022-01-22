var draw = (function(){

    var BACKGROUND_OPT_STATIC_DEFAULTS = {
       image: null,
       bgMode: 'center',
       solid: 'black',
       zoom: 2,
       sx: 0, sy: 0, sw: 320, sh: 240,
       dx:0, dy: 0, dw: 320, dh: 240
    };

    // adjust the given background options object for the given canvas element and bgMode
    // values for mode are 'stretch', 'center'
    var setFullSource = function(opt){
        var img = opt.image; 
        // use full source of image
        opt.sx = 0;
        opt.sy = 0;
        opt.sw = img.width;
        opt.sh = img.height;  
    };

    var backgroundModes = {};
    // just simply 'center' the source image to the center of the canvas, preserving the aspect ratio of the source image
    // however depending on the size of the source image this might result in the image being to small, or to large resulting
    // in some loss of the image
    backgroundModes.center = {
        BGParseOpt : function(opt, canvas){
            // use full source of image
            setFullSource(opt);
            var img = opt.image;
            opt.dx = canvas.width / 2 - img.width / 2;
            opt.dy = canvas.height / 2 - img.height / 2;
            opt.dw = img.width;
            opt.dh = img.height;
			console.log('center BGParseOPt');
			console.log(opt);
			console.log(canvas)
        },
        options: {
            zoom: {
                nodeName: 'input',
                type: 'text',
                on: {
                    keyup: function(e, opt){
                        console.log('on change of center bgMode zoom option');
                        var zoom = parseFloat(e.target.value);
                        if(String(zoom) != 'NaN'){
                            opt.zoom = zoom;
                        }
                        console.log(opt.zoom);
                    }
                }
            }
        }
    };
 
    // 'stretch' the source image to match the ratio of the canvas which will result in a distorted image
    // but the background will be filled with the source image
    backgroundModes.stretch = {
        BGParseOpt : function(opt, canvas){
            // use full source of image
            setFullSource(opt);
            // use full size of canvas
            var img = opt.image; 
            opt.dx = 0;
            opt.dy = 0;
            opt.dw = canvas.width;
            opt.dh = canvas.height;
        },
        options: {}
    };
 
    // 'none' mode will make it so the image will not draw to the canvas without clearing the image
    backgroundModes.none = {
        BGParseOpt : function(opt, canvas){
            opt.sx = 0;opt.sy = 0;opt.sw = 0;opt.sw = 0;
            opt.dx = -1;opt.dy = -1;opt.dw = 0;opt.dh = 0;;
        },
        options: {}
    };
 
    var setBackgroundOptDefaults = function(opt, canvas){
        opt.bgMode = opt.bgMode || 'center';
        var img = opt.image; 
        if(img){
            backgroundModes[opt.bgMode].BGParseOpt(opt, canvas);
        }
        return opt;
    };

    var api = {};

    // parse and return a background options object
    api.BGParseOpt = function(opt, canvas){
        opt = opt || {};
		opt.canvas = canvas;
        opt = utils.defaults(opt, BACKGROUND_OPT_STATIC_DEFAULTS);
        opt = setBackgroundOptDefaults(opt, canvas);
        return opt;
    };

    // create HTML for the current bgMode in the given BG opt object
    api.BGCreateModeOptionsHTML = function(opt){
        var bgMode = backgroundModes[opt.bgMode],
        bgOptions = bgMode.options,
        parentNode = document.createElement('span')
        Object.keys(bgOptions).forEach(function(optKey){
            var nodeOpt = bgOptions[optKey];
            var node = document.createElement(nodeOpt.nodeName);
            node.type = nodeOpt.type;
            // attach events
            Object.keys(nodeOpt.on).forEach(function(eventKey){
                node.addEventListener(eventKey, function(e){
                    nodeOpt.on[eventKey](e, opt);
                    setBackgroundOptDefaults(opt, opt.canvas);
                });
            });
            parentNode.appendChild(node);
        });
        return parentNode;
    };

    // draw a background
    api.background = function(ctx, canvas, opt){
        opt = opt || {};
        opt = utils.defaults(opt,  BACKGROUND_OPT_STATIC_DEFAULTS);
        // solid background
        ctx.fillStyle = opt.solid;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
        if(opt.image){
            ctx.drawImage(opt.image, opt.sx, opt.sy, opt.sw, opt.sh, opt.dx, opt.dy, opt.dw, opt.dh);
        }
    };

    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };

    // draw selectors
    api.selectors = function(sm, ctx){
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      sm.selectors.forEach(function(sel){
          ctx.beginPath();
          ctx.arc(sel.x, sel.y, sel.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
      });
    };

    // draw points method from js-javascript-example-draw-points
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        // for each line in points
        points.forEach(function (pointArray) {
            // number of items in the array of point values/commands
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            // loop over the line
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    // step by two if numbers
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                        if(parts[1].toLowerCase() === 'false'){
                            fill = false;
                        }
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    // step by one if one of these values
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };

    // return the public api
    return api;

}());
