var draw = function (canvas, mode) {
    console.log(canvas);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = mode === 'focus' ? 'red' : 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var onfocus = function (e) {
    var canvas = e.target;
    if (canvas.getContext) {
        draw(canvas, 'focus');
    }
};

var onblur = function (e) {
    var canvas = e.target;
    if (canvas.getContext) {
        draw(canvas, 'blur');
    }
};

var nodes = document.getElementsByTagName('canvas');
[].forEach.call(nodes, function (canvas) {
    canvas.addEventListener('focus', onfocus);
    canvas.addEventListener('blur', onblur);
    draw(canvas);
});
