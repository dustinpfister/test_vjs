var aTaner = function (opt) {
    // option defaults
    opt = opt || {};
    opt.y = opt.y === undefined ? 45 : opt.y;
    opt.x = opt.x === undefined ? 45 : opt.x;
    opt.data = opt.data || {
        lineLength: 100
    };
    opt.draw = opt.draw || function (ctx, canvas) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.stroke();
    };

    // set up canvas and input element
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    appendTo = opt.appendTo || document.body;

    var input_y = document.createElement('input');
    input_y.value = opt.y;
    input_y.id = 'input_y';
    container.appendChild(input_y);
    var input_x = document.createElement('input');
    input_x.value = opt.x;
    input_x.id = 'input_x';
    container.appendChild(input_x);

    canvas.width = opt.width === undefined ? 320 : opt.width;
    canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.cx = canvas.width / 2;
    opt.cy = canvas.height / 2;
    canvas.style.display = 'none';
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';

    appendTo.appendChild(container);

    // ON CHANGE, focus, and blur for input element
    var onFocus = function (e) {
        canvas.style.display = 'block';
    },
    onBlur = function (e) {
        canvas.style.display = 'none';
    },
    onChange = function (e) {
        var el = e.target,
        axis = el.id.split('_')[1];
        opt[axis] = e.target.value;
        opt.draw.call(opt, ctx, canvas);
    };
    input_y.addEventListener('change', onChange);
    input_y.addEventListener('focus', onFocus);
    input_y.addEventListener('blur', onBlur);
    input_x.addEventListener('change', onChange);
    input_x.addEventListener('focus', onFocus);
    input_x.addEventListener('blur', onBlur);

    // canvas event for mouse down
    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var box = e.target.getBoundingClientRect();
        input_x.value = opt.x = e.clientX - box.left;
        input_y.value = opt.y = e.clientY - box.top;
        opt.draw.call(opt, ctx, canvas);
    });

    // first draw
    opt.draw.call(opt, ctx, canvas);
};
