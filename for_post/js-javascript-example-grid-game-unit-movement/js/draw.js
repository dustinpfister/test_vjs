var draw = (function () {
    // public api
    var api = {};
    // unit colors
    var unitColors = ['green', 'gray', 'blue', 'red'];

/********** **********
     HELPERS
*********** *********/

// draw a cell helper
var drawCell = function(sm, cell){
    var map = sm.game.maps[sm.game.mapIndex];
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    // draw base cell
    ctx.fillStyle = 'green';
    if(!cell.walkable){
        ctx.fillStyle = 'gray';
    }
    // if we have a unit
    if (cell.unit) {
        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
    }
    ctx.beginPath();
    ctx.rect(x, y, 32, 32);
    ctx.fill();
    ctx.stroke();
};

/********** **********
     PUBLIC API
*********** *********/

    // draw background
    api.back = function (sm) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw the map
    api.map = function (sm) {
        var map = sm.game.maps[sm.game.mapIndex],
        i = 0,
        len = map.cells.length;
        while (i < len) {
            drawCell(sm, map.cells[i]);
            i += 1;
        }
    };
    // draw info
    api.info = function (sm) {
        var ctx = sm.ctx,
        pos = sm.input.pos,
        pCell = gameMod.getPlayerCell(sm.game),
        canvas = sm.canvas,
        dy = 14;
        // text style
        ctx.fillStyle = 'yellow';
        ctx.font = '12px courier';
        ctx.textBaseline = 'top';
        // draw current pointer position
        ctx.fillText('pos: ' + pos.x + ',' + pos.y, 5, 5 + dy * 0);
        // player cell pos
        ctx.fillText('player pos: ' + pCell.x + ',' + pCell.y, 5, 5 + dy * 1);
        // to map values
        var tm = sm.game.toMap;
        ctx.fillText('toMap: mi:' + tm.index + ', x: ' + tm.x + ', y: ' + tm.y, 5, 5 + dy * 2);
        // turn number and turnChange bool
        ctx.fillText('turn:' + sm.game.turn + ', turnState: ' + sm.game.turnState, 5, 5 + dy * 3);

        // version number
        ctx.fillText('v' + sm.ver, 1, canvas.height - 11);
    };
    // return the public api to draw variable
    return api;
}
    ());
