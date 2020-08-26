var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.valuesChart = function (ctx, canvas, state) {
    var h = canvas.height * 0.75,
    w = canvas.width * 0.75,
    i = 0,
    per,
    n,
    x,
    y,
    len = state.values.length;
    ctx.beginPath();
    while (i < len) {
        n = state.values[i];
        per = n <= 0 ? 0 : n / state.valueMax;
        x = 50 + w / (len - 1) * i;
        y = canvas.height - per * h;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        i += 1;
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
};
draw.ver = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + state.ver, 4, canvas.height - 12);

};

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

var state = {
    ver: '0.0.0',
    levelObj: {},
    level: 1,
    levelCap: 100,
    deltaNext: 10000,
    DPS: 0,
    skillPoints: 0,
    skillOptions: {
        SPEffectMax: 800,
        levelEffectMax: 200

    },
    values: [], // values array for the graph
    valueMax: 0
};

var createValues = function (state) {
    state.level = 1;
    while (state.level <= state.levelCap) {
        state.levelObj = XP.parseByLevel(state.level, state.levelCap, state.deltaNext);
        var DPS = XP.applySkillPoints(state.levelObj, state.skillPoints, state.skillOptions);
        state.values.push(Number(DPS));
        state.level += 1;
        //state.skillPoints += Math.floor(Math.pow(5, state.level));
        //state.skillPoints += Math.floor(Math.pow(1.5, state.level));
        //state.skillPoints += 1;
        //state.skillPoints = 5;
    }
    state.valueMax = Math.max.apply(null, state.values);
};

createValues(state);

console.log(state.values);

draw.back(ctx, canvas);
draw.valuesChart(ctx, canvas, state);
draw.ver(ctx, canvas, state);