var draw = (function () {
    // public api
    var api = {};


/********** **********
     HELPERS
*********** *********/

// draw a cell helper
var drawCell = function(sm, map, cell){
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.rect(x, y, cs, cs);
    ctx.fill();
};

/********** **********
     PUBLIC API
*********** *********/

    // draw background
    api.back = function (sm, style) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw the map
    api.map = function (sm, map) {
        var i = 0,
        len = map.cells.length;
        while (i < len) {
            drawCell(sm, map, map.cells[i]);
            i += 1;
        }
    };
    // draw version number
    api.ver = function(sm){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = style || 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('v' + mapMod.ver, 1, canvas.height - 10);
    };
    // return the public api to draw variable
    return api;
}
    ());
