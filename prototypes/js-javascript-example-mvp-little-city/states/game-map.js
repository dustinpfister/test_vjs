smMod.load({
    stateKey: 'gameMap',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.map(sm, sm.game.map);
        //draw.menu(sm, sm.buildMenu);
        draw.menu(sm, sm.gameStateMenu);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                console.log(button);
                smMod.setState(sm, button.action)
            }
        }
    }
});
