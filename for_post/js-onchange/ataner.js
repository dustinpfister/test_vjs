var aTaner = function (opt) {
    // option defaults
    opt = opt || {};
    opt.y = opt.y === undefined ? 45 : opt.y;
    opt.x = opt.x === undefined ? 0 : opt.x;
    opt.data = opt.data || {
        lineLength: 100
    };
    opt.draw = opt.draw || function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        r = Math.PI / 180 * this.y;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            Math.cos(r) * this.data.lineLength + cx,
            Math.sin(r) * this.data.lineLength + cy);
        ctx.stroke();
    };

    // set up canvas and input element
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    appendTo = opt.appendTo || document.body;

    var input_y = document.createElement('input');
    input_y.value = opt.y;
    container.appendChild(input_y);
    var input_x = document.createElement('input');
    input_x.value = opt.x;
    container.appendChild(input_x);

    canvas.width = opt.width === undefined ? 320 : opt.width;
    canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.cx = canvas.width / 2;
    opt.cy = canvas.height / 2;
    canvas.style.display = 'none';
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';

    appendTo.appendChild(container);

    // ON CHANGE, focus, and blur of input element
    input_y.addEventListener('change', function (e) {
        opt.y = e.target.value;
        opt.draw.call(opt, ctx, canvas);
    });
    input_y.addEventListener('focus', function (e) {
        canvas.style.display = 'block';
    });
    input_y.addEventListener('blur', function (e) {
        canvas.style.display = 'none';
    });

    // canvas events
    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
    });

    // first draw
    opt.draw.call(opt, ctx, canvas);
};
