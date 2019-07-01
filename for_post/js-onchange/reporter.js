var Reporter = function (opt) {

    opt = opt || {};

    opt.a = opt.a || 45;

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.createElement('div'),
    appendTo = opt.appendTo || document.body;

    canvas.width = 320;
    canvas.height = 240;
    canvas.style.display = 'none';

    var draw = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'white';
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        r = Math.PI / 180 * opt.a;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            Math.cos(r) * 75 + cx,
            Math.sin(r) * 75 + cy);
        ctx.stroke();

    };

    var input_a = document.createElement('input');
    input_a.value = opt.a;

    container.appendChild(input_a);
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';

    // append
    appendTo.appendChild(container);

    input_a.addEventListener('change', function (e) {

        console.log('input change');
        console.log(e.target.value);

        opt.a = e.target.value;
        draw(ctx, canvas);

    });

    input_a.addEventListener('focus', function (e) {

        console.log('focus');
        console.log(e);
        canvas.style.display = 'block';

    });

    input_a.addEventListener('blur', function (e) {

        console.log('blur');
        console.log(e);
        canvas.style.display = 'none';

    });

    draw(ctx, canvas);

};
