var draw = (function () {
    // public api
    var api = {};
    // unit colors
    // 0:green:null 1:gray:wall 2:blue:player 3:red:enemy 4:purple:portal 5:black:group 6:white:item
    var unitColors = ['green', 'gray', 'blue', 'red', 'purple', 'black', 'white'];

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
    // default fill style
    ctx.fillStyle = unitColors[0];
    // if we have a unit change fill style
    if (cell.unit) {
        // spechal case for group
        if(cell.unit.type != 'group'){
           ctx.fillStyle = unitColors[cell.unit.sheetIndex];
        }
    }
    ctx.beginPath();
    ctx.rect(x, y, cs, cs);
    ctx.fill();
    // stroke?
    if(cell.unit){
        ctx.beginPath();
        ctx.rect(x + 2, y + 2, cs - 4, cs - 4);
        ctx.strokeStyle = '#222222';
        if(cell.unit.type === 'group'){
           ctx.strokeStyle = unitColors[cell.unit.sheetIndex];
        }
        ctx.stroke();
        drawHPBar(sm, cell);
    }
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
    // draw options menu
    var forMenuKey = {
        // display weapon info for item menu
        item: function(sm, ctx, canvas){
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = '9px courier';
            var x = canvas.width / 2,
            y = canvas.height / 2 - 40;
            // current weapon info
            var cw = sm.game.player.currentWeapon;
            ctx.fillText('currentWeapon: ', x, y);
            if(cw){
                ctx.fillText('baseAttack ' + cw.baseAttack, x, y + 10);
            }else{
                ctx.fillText('Unarmed ', x, y + 10);
            }
        }
    };
    // based off of pool-solid draw method in mod-pool.js in Clucker
    api.options = function (sm) {
        var canvas = sm.canvas,
        pool = sm.game.options,
        ctx = sm.ctx,
        opt = {};
        // into text
        ctx.fillStyle = 'yellow';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = '12px courier';
        // display menu key
        var d = pool.data;
        ctx.fillText('menuKey: ' + d.menuKey, 10, 10);
        d.lines.forEach(function(line, i){
            ctx.fillText(line, 10, 10 + 15 * ( i + 1 ));
        });
        var fm = forMenuKey[d.menuKey];
        if(fm){
            fm(sm, ctx, canvas);
        }
        // draw menu buttons
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = opt.fillStyle || obj.data.fillStyle || 'white';
            ctx.strokeStyle = opt.strokeStyle || obj.data.strokeStyle || 'black';
            if (obj.active || opt.drawAll) {
                var cx = obj.x + obj.w / 2,
                cy = obj.y + obj.h / 2;
                ctx.beginPath();
                ctx.arc(cx, cy,  (obj.w + obj.h) / 2 / 2 , 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                if(obj.data.desc){
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    //ctx.textBaseline = 'middle';
                    ctx.font = '9px courier';
                    ctx.fillText(obj.data.desc, cx, cy);
                }
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
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // version number
        ctx.fillText('v' + sm.ver, 1, canvas.height - 10);
    };
    // draw info
    var getY = function(yi){
        return 5 + 12 * yi;
    };
    api.info = function (sm) {
        var ctx = sm.ctx,
        pos = sm.input.pos,
        pCell = gameMod.getPlayerCell(sm.game),
        canvas = sm.canvas,
        dy = 12;
        // text style
        ctx.fillStyle = 'yellow';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        // debug info
        var p = sm.game.player,
        pl = p.levelObj;
        ctx.fillText('level: ' + pl.level + ', xp: ' + pl.xp + ', xp to next: ' + pl.toNext, 5, getY(0));
        ctx.fillText('HP: ' + p.HP + ' / ' + p.maxHP, 5, getY(1));
        ctx.fillText('attack: ' + p.attack[0] + ' - ' + p.attack[1], 5, getY(2));
        ctx.fillText('defense: ' + p.baseDefense[0] + ' - ' + p.baseDefense[1], 5, getY(3));
        var w = p.currentWeapon;
        if(w){
            ctx.fillText('wepaon attack: ' + w.baseAttack[0] + ' - ' + w.baseAttack[1] , 5, getY(4));
        }else{
            ctx.fillText('wepaon: unarmed', 5, getY(4));
        }
    };
    // return the public api to draw variable
    return api;
}
    ());
