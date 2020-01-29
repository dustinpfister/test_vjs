
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

    // DISPLAY STATE
    disp: {
        tick: function () {},
        pointer: {
            start: function (pos, grid, e) {

                grid.mapMoveStartPoint = {
                    x: pos.x,
                    y: pos.y
                };

            },
            move: function (pos, grid, e) {

                // movement can trigger nave state
                var pos2 = grid.mapMoveStartPoint;
                grid.moveDistance = 0;
                if (grid.mapMoveStartPoint.x != -1 && grid.mapMoveStartPoint.y != -1) {
                    grid.moveDistance = u.distance(pos.x, pos.y, pos2.x, pos2.y);
                }

                grid.mapMoveMode = false;
                if (grid.moveDistance >= 32) {
                    grid.mapMoveMode = true;
                    // enter nav mode
                    states.currentState = 'nav';
                }

            },
            end: function (pos, grid, e) {

                // select a cell if not entering nav state
                if (!grid.mapMoveMode) {
                    var cell = g.getCellFromCanvasPoint(grid, pos.x, pos.y);
                    if (cell.i === grid.selectedCellIndex) {
                        grid.selectedCellIndex = -1;
                    } else {
                        if (cell.i >= 0) {
                            grid.selectedCellIndex = cell.i;
                            var cell = grid.cells[cell.i];
                            // if cell index enter building state
                            if (cell.building.index >= 0) {
                                states.currentState = 'building';
                            } else {
                                // else eneter land state
                                states.currentState = 'land';

                            }
                        }
                    }
                }

                grid.mapMoveStartPoint = {
                    x: -1,
                    y: -1
                };

            }
        }
    },

    // NAV STATE
    nav: {
        tick: function () {},
        pointer: {

            move: function (pos, grid, e) {

                var deltas = g.getPointerMovementDeltas(grid, canvas, pos.x, pos.y),
                pos2 = grid.mapMoveStartPoint;

                grid.moveDistance = u.distance(pos.x, pos.y, pos2.x, pos2.y);
                grid.mapMoveDeltas.x = deltas.x;
                grid.mapMoveDeltas.y = deltas.y;

            },
            end: function (pos, grid, e) {

                grid.mapMoveMode = false;
                grid.mapMoveDeltas.x = 0;
                grid.mapMoveDeltas.y = 0;
                grid.mapMoveStartPoint = {
                    x: -1,
                    y: -1
                };

                // return to disp
                states.currentState = 'disp';

            }

        }
    },

    land: {
        tick: function () {}
    },

    building: {
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
