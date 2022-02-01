var draw = (function () {

    var LAND_COLORS = ['green', 'lime', 'yellow', 'orange', 'red'],
    POP_COLORS = ['#220022', '#550055', '#880088', '#ff00ff']

    // public api
    var api = {};


/********** **********
     HELPERS
*********** *********/

var drawCellText = function(ctx, map, cell, text){
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs + cs / 2;
    var y = map.margin.y + cell.y * cs + cs / 2;
    ctx.fillStyle = '#8f8f8f';
    ctx.textAlign = 'center';
    ctx.font = '12px courier';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y)
};

var rect = function(ctx, x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
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
    ctx.strokeStyle = 'black';
    if(cell.data.unit){
        ctx.fillStyle = cell.data.unit.fillStyle;
    }
    rect(ctx, x, y, cs, cs);
};

drawCell.value = function(sm, ctx, cell, x, y, cs){
    var per = cell.data.landValue / sm.game.hardSet.MAX_CELL_LAND_VALUE;
    ctx.fillStyle = 'black';
    if(per != 0){
        ctx.fillStyle = LAND_COLORS[Math.floor((LAND_COLORS.length - 1) * per)];
    }
    ctx.strokeStyle = 'white';
    rect(ctx, x, y, cs, cs);
    drawCellText(ctx, sm.game.map, cell, cell.data.landValue);
};

drawCell.population = function(sm, ctx, cell, x, y, cs){
    var per = cell.data.population / sm.game.hardSet.MAX_CELL_POPULATION;
    ctx.fillStyle = 'black';
    if(per != 0){
        ctx.fillStyle = POP_COLORS[Math.floor((POP_COLORS.length - 1) * per)];
    }
    ctx.strokeStyle = 'white';
    rect(ctx, x, y, cs, cs);
    drawCellText(ctx, sm.game.map, cell, cell.data.population);
};

drawCell.roads = function(sm, ctx, cell, x, y, cs){
    ctx.fillStyle = 'black';
    if(cell.walkable){
        ctx.fillStyle = 'orange';
    }
    rect(ctx, x, y, cs, cs);
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
            ctx.fillText(button.desc, x * cs + 4, y * cs + 12);
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
