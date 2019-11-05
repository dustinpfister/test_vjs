var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var data = (function () {

    var stats = [{
            lable: 'impressions',
            values: [125, 397, 487, 463, 472, 321, 94]
        }, {
            lable: 'clicks',
            values: [9, 33, 29, 30, 29, 13, 7]
        }
    ];

    stats.push((function () {
            return {
                lable: 'ctr',
                values: stats[0].values.map(function (imp, index) {
                    return imp / stats[1].values[index];
                })
            }
        }
            ()));

    return stats;
}
    ());

console.log(data);

var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.restore();
};

var loop = function () {
    requestAnimationFrame(loop);
    draw();
};
loop();
