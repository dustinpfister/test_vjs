smMod.load({
    stateKey: 'gameBuild',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.map(sm, sm.game.map, 'normal');
        draw.menu(sm, sm.buildMenu);
        draw.menu(sm, sm.gameStateMenu);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            var cell = mapMod.getCellByPointer(sm.game.map, pos.x, pos.y);
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
                    console.log( Object.assign({}, cell.data, {x: cell.x, y: cell.y, walkable: cell.walkable}) );
					
					console.log( mapMod.getPath(sm.game.map, 3, 5, 3, 3) );
					
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
});
