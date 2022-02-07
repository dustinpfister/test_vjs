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
        ctx.fillStyle = LAND_COLORS[Math.round((LAND_COLORS.length - 1) * per)];
    }
    ctx.strokeStyle = 'white';
    rect(ctx, x, y, cs, cs);
    drawCellText(ctx, sm.game.map, cell, cell.data.landValue);
};

drawCell.population = function(sm, ctx, cell, x, y, cs){
    var per = cell.data.population / sm.game.hardSet.MAX_CELL_POPULATION;
    ctx.fillStyle = 'black';
    if(per != 0){
        ctx.fillStyle = POP_COLORS[Math.round((POP_COLORS.length - 1) * per)];
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
    api.back = function (sm, style) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = style || 'black';
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
        cw = bm.cellWidth,
        ch = bm.cellHeight;
        ctx.save();
        ctx.translate(bm.x, bm.y);
        bm.buttons.forEach(function(button, i){
            var x = i % bm.w,
            y = Math.floor(i / bm.w);
            ctx.fillStyle = i === bm.currentIndex ? 'yellow' : 'white';
            ctx.fillRect(x * cw, y * ch, cw, ch);
            // text
            ctx.font = '10px courier';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText(button.desc, x * cw + cw / 2, y * ch + ch / 2);
        });
        ctx.restore();
    };

    var standardText = function(ctx){
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
    };

    // draw standard display
    api.disp = function(sm){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        standardText(ctx);
        // version number
        ctx.fillText('money: ' + sm.game.money + ', pop: ' + sm.game.population + ', year: ' + sm.game.year, 5, 5);
    };

    api.dispBudget = function(sm){
        var ctx = sm.ctx, canvas = sm.canvas,
        tr = sm.game.taxRate.propertyTax;
        // text style
        standardText(ctx);
        ctx.font = '15px courier';
        var y = 128 + 7, x = 200,
        dy = 15,
        sDat = sm.stateObj;
        ctx.fillText('property tax rate: ' + Math.round(tr * 100) + '%', x, y);
        ctx.fillText('income: ' + sDat.income, x, y + dy * 14);
        ctx.fillText('Money Next Year: ' + sDat.moneyNextYear, x, y + dy * 15);
    };

    // draw version number
    api.ver = function(sm){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        standardText(ctx);
        // version number
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return the public api to draw variable
    return api;
}
    ());
