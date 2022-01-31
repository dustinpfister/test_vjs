var draw = (function () {

    var LAND_VALUE_COLORS = ['rgba(0,0,0,0.5)', '#008800', '#00ff00', '#ffff00', '#88ff00', '#ff0000']

    // public api
    var api = {};


/********** **********
     HELPERS
*********** *********/

var fillRect = function(ctx, x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
};

// draw a cell helper
var drawCell = function(sm, map, cell, layer){
    layer = layer || 'normal';
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    drawCell[layer](sm, ctx, cell, x, y, cs);
};

drawCell.normal = function(sm, ctx, cell, x, y, cs){
    ctx.fillStyle = cell.data.fillStyle || 'white';
    if(cell.data.unit){
        ctx.fillStyle = cell.data.unit.fillStyle;
    }
    fillRect(ctx, x, y, cs, cs);
};

drawCell.value = function(sm, ctx, cell, x, y, cs){
    var per = cell.data.landValue / 10;
    ctx.fillStyle = LAND_VALUE_COLORS[Math.round(LAND_VALUE_COLORS.length * per)];
    fillRect(ctx, x, y, cs, cs);
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
    api.map = function (sm, map, layer) {
        var i = 0,
        len = map.cells.length;
        while (i < len) {
            drawCell(sm, map, map.cells[i], layer);
            i += 1;
        }
    };
    // draw the build menu
    api.menu = function(sm, menu){
        var canvas = sm.canvas,
        ctx = sm.ctx,
        bm = menu || sm.buildMenu,
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
    api.disp = function(sm){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('money: ' + sm.game.money + ', pop: ' + sm.game.population + ', year: ' + sm.game.year, 5, 5);
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
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return the public api to draw variable
    return api;
}
    ());
