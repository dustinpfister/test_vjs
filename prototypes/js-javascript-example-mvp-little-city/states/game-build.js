smMod.load({
    stateKey: 'gameBuild',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.map(sm, sm.game.map);
        draw.buildMenu(sm);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            //var pos = utils.getCanvasRelative(e);
            var cell = mapMod.getCellByPointer(sm.game.map, pos.x, pos.y);
            // if map cell clicked
            if(cell){
                var button = sm.buildMenu.buttons[sm.buildMenu.currentIndex];
                var unitKey = button.unitKey;
                if(button.action === 'sell'){
                    if(cell.data.unit){
                        cell.data.unit = null;
                        sm.game.money += 50;
                    }else{
                        console.log('no unit to sell');
                    }
                }
                if(button.action === 'info'){
                    console.log( Object.assign({}, cell.data, {x: cell.x, y: cell.y}) );
                }
                if(button.action === 'build'){
                    gameMod.buildAt(sm.game, unitKey, cell);
                }
            }
            // if build menu clicked

smMod.gridMenu.click(sm.buildMenu, pos)

/*
            var bm = sm.buildMenu,
            w = bm.cellSize * bm.w,
            h = bm.cellSize * bm.buttons.length / bm.w;
            if(utils.boundingBox( bm.x, bm.y, w, h, pos.x, pos.y, 1, 1 )){
                var x = Math.floor((pos.x - bm.x) / bm.cellSize);
                var y = Math.floor((pos.y - bm.y) / bm.cellSize);
                var i = y * bm.w + x;
                var button = bm.buttons[i];
                if(button){
                    bm.currentIndex = i;
                    console.log(button);
                }
            }
*/
        }
    }
});
