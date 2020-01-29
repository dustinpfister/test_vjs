
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
var states = {

    currentState: 'init',

    grid: g.createGridObject(17, 13),

    always: {
        tick: function () {
            g.updateGrid(states.grid, pxRatio);
        }
    },

    init: {
        tick: function () {

            grid = states.grid;
            grid.xOffset = 0;
            grid.yOffset = 0;
            g.setGridWorth(grid, 0, 0, 2);

            // starting building
            g.createBuilding(grid, 8, 6, 0);

            states.currentState = 'disp';

        }
    },

    disp: {
        tick: function () {},
        pointer: {
            start: function (pos, grid, e) {

                grid.mapMoveStartPoint = {
                    x: pos.x,
                    y: pos.y
                };

            },
            end: function (pos, grid, e) {

                if (!grid.mapMoveMode) {
                    var cell = g.getCellFromCanvasPoint(grid, pos.x, pos.y);
                    if (cell.i === grid.selectedCellIndex) {
                        grid.selectedCellIndex = -1;
                    } else {
                        if (cell.i >= 0) {
                            grid.selectedCellIndex = cell.i;
                        }
                    }
                }

            }
        }
    },

    nav: {
        tick: function () {},
        pointer: {

            move: function (pos, grid, e) {

                var deltas = g.getPointerMovementDeltas(grid, canvas, pos.x, pos.y);

                grid.moveDistance = 0;
                if (grid.mapMoveStartPoint.x != -1 && grid.mapMoveStartPoint.y != -1) {
                    grid.moveDistance = u.distance(pos.x, pos.y, grid.mapMoveStartPoint.x, grid.mapMoveStartPoint.y);
                }

                if (grid.moveDistance >= 32) {
                    grid.mapMoveMode = true;
                    grid.mapMoveDeltas.x = deltas.x;
                    grid.mapMoveDeltas.y = deltas.y;
                } else {
                    grid.mapMoveMode = false;
                }

            },
            end: function (pos, grid, e) {

                grid.mapMoveMode = false;
                grid.mapMoveDeltas.x = 0;
                grid.mapMoveDeltas.y = 0;
                grid.mapMoveStartPoint = {
                    x: -1,
                    y: -1
                };

            }

        }
    },

    createMenu: {
        tick: function () {}
    },

    buildingMenu: {
        tick: function () {}
    }

};

var loop = function () {
    requestAnimationFrame(loop);

    states.always.tick();
    states[states.currentState].tick();

    // draw
    draw.background(ctx, canvas); // background
    drawMap(states.grid, ctx, canvas, pxRatio); // the map
    draw.gridStatusInfo(ctx, canvas, states.grid); // status bar
    draw.debugInfo(ctx, states.grid); // drawing debug into
};
loop();

// EVENTS
var attachEvent = function (canvas, domType, smType) {
    canvas.addEventListener(domType, function (e) {
        var pos = u.getCanvasRelative(e);
        var stateObj = states[states.currentState];
        if (stateObj.pointer) {
            var handler = stateObj.pointer[smType];
            if (handler) {
                handler(pos, states.grid, e);
            }
        }
    });
};
attachEvent(canvas, 'mousedown', 'start');
attachEvent(canvas, 'mousemove', 'move');
attachEvent(canvas, 'mouseup', 'end');
