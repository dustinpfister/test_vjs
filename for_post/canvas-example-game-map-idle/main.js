
// CANVAS

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
var pxRatio = window.devicePixelRatio || 1; // scale
canvas.width = 320 * pxRatio;
canvas.height = 240 * pxRatio;
ctx.translate(0.5, 0.5);

// CREATE GRID


// MAIN APP LOOP
var grid;
var states = {

    currentState: 'init',

    grid: g.createGridObject(17, 13),

    init: function () {

        grid = states.grid;
        grid.xOffset = 0;
        grid.yOffset = 0;
        g.setGridWorth(grid, 0, 0, 2);

        // starting building
        g.createBuilding(grid, 8, 6, 0);

        states.currentState = 'disp';

    },

    always: function () {

        g.updateGrid(states.grid, pxRatio);

    },

    disp: function () {},

    nav: function () {},

    createMenu: function () {},

    buildingMenu: function () {}

};

var loop = function () {
    requestAnimationFrame(loop);

    states[states.currentState]();
    states.always();

    // draw
    draw.background(ctx, canvas); // background
    drawMap(states.grid, ctx, canvas, pxRatio); // the map
    draw.gridStatusInfo(ctx, canvas, states.grid); // status bar
    draw.debugInfo(ctx, states.grid); // drawing debug into
};
loop();

// EVENTS

canvas.addEventListener('mousedown', function (e) {
    g.userCanvasActionStart(states.grid, e, pxRatio);
});

canvas.addEventListener('mouseup', function (e) {
    g.userCanvasActionEnd(states.grid, e, pxRatio);
});
canvas.addEventListener('mousemove', function (e) {
    g.userCanvasActionMove(states.grid, e, pxRatio);
});
