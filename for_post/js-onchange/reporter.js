var Reporter = function (opt) {

    opt = opt || {};

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
    };

    var input_x = document.createElement('input');

    container.appendChild(input_x);
    container.appendChild(canvas);
    container.style.width = canvas.width + 'px';

    // append
    appendTo.appendChild(container);

    input_x.addEventListener('change', function (e) {

        console.log('input change');
        console.log(e.target.value);

    });

    input_x.addEventListener('focus', function (e) {

        console.log('focus');
        console.log(e);
        canvas.style.display = 'block';

    });

    input_x.addEventListener('blur', function (e) {

        console.log('blur');
        console.log(e);
        canvas.style.display = 'none';

    });

    draw(ctx, canvas);

};
