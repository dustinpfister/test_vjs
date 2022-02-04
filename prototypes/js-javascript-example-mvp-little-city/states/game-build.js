smMod.load({
    stateKey: 'gameBuild',
    data: {
        cellWindowActive: false, // if true the cell window is active
        selectedCell: null,
        cellInfo: {}
    },
    update: function(sm, secs){
        var sDat = sm.stateObj.data;
        gameMod.update(sm.game, secs);
        if(sDat.selectedCell){
            var cell = sDat.selectedCell;
            var cInfo = sDat.cellInfo = {
                x: cell.x, y: cell.y
            };
            var unit = cell.data.unit;
            if(unit){
                var unitKey = cInfo.unitKey = unit.unitKey;
                if(unitKey === 'res'){
                    cInfo.population = cell.data.population;
                    cInfo.immigrRate = cell.data.immigrRate;
                    cInfo.immigr = cell.data.popDelta.immigr;
                }
            }
        }
    },
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);
        if(sDat.cellWindowActive){
            ctx.fillStyle = 'white';
            var x = 32,
            y = 128;
            Object.keys(sDat.cellInfo).forEach(function(key, i){
                ctx.fillText(key + ': ' + sDat.cellInfo[key], x, y + 15 * i);
            });
        }else{
            draw.map(sm, sm.game.map, 'normal');
            draw.menu(sm, sm.buildMenu);
            draw.menu(sm, sm.gameStateMenu);

        }
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            var sDat = sm.stateObj.data;
            var cell = mapMod.getCellByPointer(sm.game.map, pos.x, pos.y);

            if(sDat.cellWindowActive){
                sDat.cellWindowActive = false;
                sDat.selectedCell = null;
            }else{
                // if map cell clicked
                if(cell){
                    var button = sm.buildMenu.buttons[sm.buildMenu.currentIndex];
                    var unitKey = button.unitKey;
                    if(button.action === 'sell'){
                        if(cell.data.unit){
                            cell.data.unit = null;
                            cell.walkable = false;
                            sm.game.money += 50;
                        }else{
                            console.log('no unit to sell');
                        }
                    }
                    if(button.action === 'info'){
                        sDat.cellWindowActive = true;
                        sDat.selectedCell = cell;
                        //sDat.cellInfo = Object.assign({}, cell.data, {x: cell.x, y: cell.y, walkable: cell.walkable});
                        //console.log( Object.assign({}, cell.data, {x: cell.x, y: cell.y, walkable: cell.walkable}) );
	                //console.log( mapMod.getPath(sm.game.map, 3, 5, 3, 3) );		
                    }
                    if(button.action === 'build'){
                        gameMod.buildAt(sm.game, unitKey, cell);
                    }
                }
                // if build menu clicked
                smMod.gridMenu.click(sm.buildMenu, pos);
                var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
                if(button){
                    smMod.setState(sm, button.action)
                }
            }
        }
    }
});
