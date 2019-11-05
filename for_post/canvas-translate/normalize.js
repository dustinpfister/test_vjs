// data objects
var data = (function () {
    var api = {
        chartWidth: 160,
        chartHeight: 120,
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
    // the stats
    api.stats = stats;
    // create an array of normalized points
    api.points = stats.map(function (statObj) {
            var max = Math.max.apply(null, statObj.values),
            deltaX = api.chartWidth / (stats[0].values.length - 1);
            return statObj.values.map(function (val, i) {
                return {
                    x: deltaX * i - api.chartWidth / 2,
                    y: (1 - val / max) * api.chartHeight - api.chartHeight / 2
                }
            });
        })
        // return stats array
        return api
}
    ());

// draw a stat objects normalized chart value points
var drawStatObjects = function (ctx, data) {
    ctx.lineWidth = 3;
    data.points.forEach(function (statPoints, statIndex) {
        var statObj = data.stats[statIndex];
        ctx.beginPath();
        ctx.strokeStyle = statObj.color || 'red';
        statPoints.forEach(function (pt, pointIndex) {
            ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
    });
};

// draw normalized base lines of chart
var drawBaseLines = function (ctx, data) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(-data.chartWidth / 2, -data.chartHeight / 2);
    ctx.lineTo(-data.chartWidth / 2, data.chartHeight / 2);
    ctx.lineTo(data.chartWidth / 2, data.chartHeight / 2);
    ctx.stroke();
};

// main draw method that uses canvas translate
var draw = function (ctx, data) {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // translate to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // draw stat object points
    drawStatObjects(ctx, data);
    // draw base lines
    drawBaseLines(ctx, data);
};

// the app
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
draw(ctx, data);