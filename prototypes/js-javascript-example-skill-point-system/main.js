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
    levelCap: 100,
    deltaNext: 10000,
    DPS: 0,
    skillPoints: 0,
    skillOptions: {}
};

state.levelObj = XP.parseByLevel(state.level, state.levelCap, state.deltaNext);

state.DPS = XP.applySkillPoints(state.levelObj, state.skillPoints, state.skillOptions);

ctx.fillRect(0, 0, canvas.width, canvas.height);


console.log(Number(state.DPS));

