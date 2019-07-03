var aTaner = function (opt) {
    // set up state
    opt = opt || {};
    var state = {
        appendTo: opt.appendTo || document.body,
        x: opt.x === undefined ? 45 : opt.x,
        y: opt.y === undefined ? 45 : opt.y,
        a: 0,
        cx: 0,
        cy: 0,
        figureAngle: function () {
            this.a = Math.atan2(this.y - this.cy, this.x - this.cx)
        },
        draw: opt.draw || function (ctx, canvas) {
            // fill
            ctx.fillStyle = 'black';
            ctx.lineWidth = 3;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // stroke point that can change
            ctx.beginPath();
            ctx.strokeStyle = 'green';

            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
            ctx.stroke();

            // center
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.arc(this.cx, this.cy, 10, 0, Math.PI * 2);
            ctx.stroke();

            // draw line
            ctx.beginPath();
            ctx.moveTo(this.cx, this.cy);
            ctx.lineTo(
                Math.cos(this.a) * 100 + this.cx,
                Math.sin(this.a) * 100 + this.cy);
            ctx.stroke();
        }
    };

    // set up canvas and input element
    var input_y = document.createElement('input');
    input_y.value = state.y;
    input_y.id = 'input_y';

    var input_x = document.createElement('input');
    input_x.value = state.x;
    input_x.id = 'input_x';

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div');

    canvas.width = opt.width === undefined ? 320 : opt.width;
    canvas.height = opt.height === undefined ? 240 : opt.height;

    state.cx = canvas.width / 2;
    state.cy = canvas.height / 2;
    canvas.style.display = 'none';

    container.appendChild(input_x);
    container.appendChild(input_y);
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';

    state.appendTo.appendChild(container);

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
        //opt[axis] = e.target.value;
        //figureAngle();
        //opt.draw.call(opt, ctx, canvas);
        state[axis] = e.target.value;
        state.figureAngle();
        state.draw.call(state, ctx, canvas);
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
        //input_x.value = opt.x = e.clientX - box.left;
        //input_y.value = opt.y = e.clientY - box.top;
        //figureAngle();
        //opt.draw.call(opt, ctx, canvas);
        input_x.value = state.x = e.clientX - box.left;
        input_y.value = state.y = e.clientY - box.top;
        state.figureAngle();
        state.draw.call(state, ctx, canvas);
    });

    // first draw
    //figureAngle();
    //opt.draw.call(opt, ctx, canvas);
    state.figureAngle();
    state.draw.call(state, ctx, canvas);
};
