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

    ctx.fillStyle = cell.data.fillStyle || 'white';

    if(cell.data.unit){
        ctx.fillStyle = cell.data.unit.fillStyle;
    }


    ctx.beginPath();
    ctx.rect(x, y, cs, cs);
    ctx.fill();
};

/********** **********
     PUBLIC API
*********** *********/

    // draw background
    api.back = function (sm) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = 'black';
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
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
    // draw the build menu
    api.buildMenu = function(sm){
        var canvas = sm.canvas,
        ctx = sm.ctx,
        bm = sm.buildMenu,
        cs = bm.cellSize;
        ctx.save();
        ctx.translate(bm.x, bm.y);
        bm.buttons.forEach(function(button, i){
            var x = i % bm.w,
            y = Math.floor(i / bm.w);
            ctx.fillStyle = i === bm.currentIndex ? 'yellow' : 'white';
            ctx.fillRect(x * cs, y * cs, cs, cs);
            // text
            ctx.font = '10px courier';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'black';
            ctx.fillText(button.unitKey, x * cs + 4, y * cs + 12);
        });
        ctx.restore();
    };
    // draw version number
    api.ver = function(sm){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('version: ' + mapMod.ver, 5, canvas.height - 15);
    };
    // return the public api to draw variable
    return api;
}
    ());
