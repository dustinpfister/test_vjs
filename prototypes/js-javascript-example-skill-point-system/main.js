// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

console.log(Number(XP.parseByLevel(7)));

var state = {
    levelObj: {},
    level: 1,
    levelCap: 10,
    deltaNext: 10000,
    DPS: 0,
    skillPoints: 0,
    skillOptions: {},
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
        state.skillPoints += Math.floor(Math.pow(1.847, state.level)); // 1000sp over 100 levels
        //state.skillPoints += 1;
    }
    state.valueMax = Math.max.apply(null, state.values);
};

createValues(state);

console.log(state.valueMax);

ctx.fillRect(0, 0, canvas.width, canvas.height);
