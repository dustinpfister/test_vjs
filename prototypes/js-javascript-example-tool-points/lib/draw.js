var draw = (function(){

    var BACKGROUND_OPT_STATIC_DEFAULTS = {
       image: null,
       solid: 'black',
       sx: 0, sy: 0, sw: 320, sh: 240,
       dx:0, dy: 0, dw: 320, dh: 240
    };

    // adjust the given background options object for the given canvas element and bgMode
    // values for mode are 'stretch', 'center'
    var backgroundModes = {
        stretch : function(opt, canvas){
           var img = opt.image; 
           // use full source of image
           opt.sx = 0;
           opt.sy = 0;
           opt.sw = img.width;
           opt.sh = img.height;
           // use full size of canvas
           opt.dx = 0;
           opt.dy = 0;
           opt.dw = canvas.width;
           opt.dh = canvas.height;
        }
    };
    var setBackgroundOptDefaults = function(opt, canvas, bgMode){
        bgMode = bgMode || 'stretch';
        var img = opt.image; 
        if(img){
            backgroundModes[bgMode](opt, canvas);
        }
        return opt;
    };

    var api = {};

    // draw a background
    api.background = function(ctx, canvas, opt){
        opt = opt || {};
        opt = utils.defaults(opt,  BACKGROUND_OPT_STATIC_DEFAULTS);

        opt = setBackgroundOptDefaults(opt, canvas );
        
        // solid background
        ctx.fillStyle = opt.solid;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
        if(opt.image){
            //var sx = 0,
            //sy = 0,
            //sw = opt.image.width,
            //sh = opt.image.height,
            //dx = 0,
            //dy = 0,
            //dw = opt.image.width,
            //dh = opt.image.height;
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
