// data objects
var data = (function () {
    var api = {
        stats: [],
        chartWidth: 160,
        chartHeight: 120,
        points: [],
        // normalize points
        normalize: function () {
            return api.points = api.stats.map(function (statObj) {
                    var max = Math.max.apply(null, statObj.values),
                    deltaX = api.chartWidth / (stats[0].values.length - 1);
                    return statObj.values.map(function (val, i) {
                        return {
                            x: (deltaX * i - api.chartWidth / 2) / api.chartWidth,
                            y: ((1 - val / max) * api.chartHeight - api.chartHeight / 2) / api.chartHeight
                        }
                    });
                });
        },
        // set scale of points by normalizing, and then scaling
        scale: function (scaleW, scaleH) {
            api.chartWidth = scaleW || api.chartWidth;
            api.chartHeight = scaleH || api.chartHeight;
            api.normalize();
            return api.points = api.points.map(function (statPoints) {
                    return statPoints.map(function (pt) {
                        pt.x = pt.x * api.chartWidth;
                        pt.y = pt.y * api.chartHeight;
                        return pt;
                    });
                });
        }
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
    // set stats and update points for first time
    api.stats = stats;
    api.normalize();
    api.scale();
    // return the api
    return api
}
    ());

console.log(data)

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
var drawGraph = function (ctx, data, x, y) {
    ctx.save();
    // translate to the center of the canvas
    ctx.translate(x, y);
    // draw stat object points
    drawStatObjects(ctx, data);
    // draw base lines
    drawBaseLines(ctx, data);
    ctx.restore();
};

// draw background
var drawBackground = function (ctx) {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Lets use it
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

drawBackground(ctx);

// draw Graph at default
drawGraph(ctx, data, canvas.width / 2, canvas.height / 2);

// using scale method to make a smaller version of the graph
data.scale(50,50);
drawGraph(ctx, data, 30, 30);
