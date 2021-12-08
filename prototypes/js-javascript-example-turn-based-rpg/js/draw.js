var draw = (function () {
    // public api
    var api = {};
    // unit colors
    var unitColors = ['green', 'gray', 'blue', 'red'];

/********** **********
     HELPERS
*********** *********/

// draw an hp bar for the given cell, if it has a vaild unit
var drawHPBar = function(sm, cell){
    var unit = cell.unit;
    var ctx = sm.ctx;
    var map = sm.game.maps[sm.game.mapIndex];
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    if (unit) {
        if(unit.type == 'player' || unit.type === 'enemy'){
             // hp bar back
             ctx.fillStyle = 'gray';
             ctx.beginPath();
             ctx.rect(x, y, cs, 5);
             ctx.fill();
             ctx.stroke();
             // current hp
             var per = unit.HP / unit.maxHP;
             ctx.fillStyle = 'lime';
             ctx.beginPath();
             ctx.rect(x, y, cs * per, 5);
             ctx.fill();
             ctx.stroke();
        }
    }
};

// draw a cell helper
var drawCell = function(sm, cell){
    var map = sm.game.maps[sm.game.mapIndex];
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    // draw base cell
    ctx.fillStyle = unitColors[0];
    // if we have a unit
    if (cell.unit) {
        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
    }
    ctx.beginPath();
    ctx.rect(x, y, cs, cs);
    ctx.fill();
    ctx.stroke();
    drawHPBar(sm, cell);
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
    api.options = function (sm) {
        var canvas = sm.canvas,
        pool = sm.game.options,
        ctx = sm.ctx;
        opt = opt || {};
        // from mod-pool.js in Clucker
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = opt.fillStyle || obj.data.fillStyle || 'white';
            ctx.strokeStyle = opt.strokeStyle || obj.data.strokeStyle || 'black';
            if (obj.active || opt.drawAll) {
                ctx.beginPath();
                ctx.arc(obj.x + obj.w / 2, obj.y + obj.h / 2,  (obj.w + obj.h) / 2 / 2 , 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        });
    };
    // bland place holder title text
    api.titleText = function(sm){
        var canvas = sm.canvas,
        ctx = sm.ctx;
        // text style
        ctx.fillStyle = 'white';
        ctx.font = '20px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        var x = canvas.width / 2,
        y = canvas.height * 0.25;
        ctx.fillText('Turn Based RPG Prototype', x, y);
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
    // draw version number
    api.ver = function(sm, style){
        var ctx = sm.ctx,
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = style || 'white';
        ctx.font = '8px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('v' + sm.ver, 1, canvas.height - 10);
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
        ctx.textAlign = 'left';
        // draw current pointer position
        ctx.fillText('pos: ' + pos.x + ',' + pos.y, 5, 5 + dy * 0);
        // player cell pos
        ctx.fillText('player pos: ' + pCell.x + ',' + pCell.y, 5, 5 + dy * 1);
        // to map values
        var tm = sm.game.toMap;
        ctx.fillText('toMap: mi:' + tm.index + ', x: ' + tm.x + ', y: ' + tm.y, 5, 5 + dy * 2);
        // turn number and turnChange bool
        ctx.fillText('turn:' + sm.game.turn + ', turnState: ' + sm.game.turnState, 5, 5 + dy * 3);
        // enemies
        ctx.fillText('enemies:' + sm.game.remainingEnemies, 5, 5 + dy * 4);
    };
    // return the public api to draw variable
    return api;
}
    ());
