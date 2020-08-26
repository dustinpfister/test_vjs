var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.valuesChart = function (ctx, canvas, state) {
    var h = canvas.height,
    w = canvas.width,
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
        x = w / (len - 1) * i;
        y = h - per * h;
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

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

var state = {
    levelObj: {},
    level: 1,
    levelCap: 10,
    deltaNext: 10000,
    DPS: 0,
    skillPoints: 0,
    skillOptions: {
        SPEffectMax: 2000,
        levelEffectMax: 500

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
        //state.skillPoints += Math.floor(Math.pow(1.847, state.level)); // 1000sp over 100 levels
        //state.skillPoints += 1;
        //state.skillPoints = 5;
    }
    state.valueMax = Math.max.apply(null, state.values);
};

createValues(state);

console.log(state.values);

draw.back(ctx, canvas);
draw.valuesChart(ctx, canvas, state);
