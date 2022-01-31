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



//console.log( gameMod.getArea(sm.game, 1, 1, 2, 2) );

//var dist = 3,
//s = dist * 2 + 1;
//console.log( gameMod.getArea(sm.game, cell.x - dist, cell.y - dist, s, s) );
//console.log( gameMod.getTypeInArea(sm.game, cell.x - dist, cell.y - dist, s, s, 'road') );



                }
                if(button.action === 'build'){
                    gameMod.buildAt(sm.game, unitKey, cell);
                }
            }

            // if build menu clicked
            smMod.gridMenu.click(sm.buildMenu, pos);

            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                console.log(button);
                smMod.setState(sm, button.action)
            }

        }
    }
});
