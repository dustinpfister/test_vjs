smMod.load({
    stateKey: 'gameMap',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        var mapButton = sm.mapMenu.buttons[sm.mapMenu.currentIndex];
        draw.map(sm, sm.game.map, mapButton.action);
        draw.menu(sm, sm.gameStateMenu);
        draw.menu(sm, sm.mapMenu);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            // if map menu clicked
            smMod.gridMenu.click(sm.mapMenu, pos);
            // game state change?
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                smMod.setState(sm, button.action)
            }
        }
    }
});
