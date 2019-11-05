var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var data = (function () {

    var api = {
        chartWidth: 160,
        chartHeight: 80,
    };

    // hard coded stats
    var stats = [{
            lable: 'impressions',
            color: 'cyan',
            values: [125, 397, 487, 463, 472, 321, 94]
        }, {
            lable: 'clicks',
            color: 'blue',
            values: [9, 33, 29, 30, 29, 13, 7]
        }
    ];
    // creating a ctr stat object
    stats.push((function () {
            return {
                lable: 'CTR',
                color: 'green',
                values: stats[0].values.map(function (imp, index) {
                    return imp / stats[1].values[index];
                })
            }
        }
            ()));

    api.stats = stats;
    api.deltaX = api.chartWidth / stats[0].values.length;
    // create an array of normalized points
    api.points = stats.map(function (statObj) {
            var max = Math.max.apply(null, statObj.values);
            return statObj.values.map(function (val, i) {
                console.log(val / max)
                return {
                    x: api.deltaX * i - api.chartWidth / 2,
                    y: val / max * api.chartHeight - api.chartHeight / 2
                }
            });
        })
        // return stats array
        return api
}
    ());

console.log(data);

// draw a stat object
var drawStatObj = function (ctx, data, statIndex) {

    statObj = data.stats[statIndex];

    ctx.strokeStyle = statObj.color || 'red';
    ctx.beginPath();
    statObj.values.forEach(function (val, i) {
        ctx.lineTo(i * data.deltaX, val);
    });
    ctx.stroke();

}

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawStatObj(ctx, data, 0);
