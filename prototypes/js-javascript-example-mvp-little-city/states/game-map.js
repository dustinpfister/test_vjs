smMod.load({
    stateKey: 'gameMap',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        //draw.map(sm, sm.game.map, 'population');

draw.map(sm, sm.game.map, sm.mapMenu.buttons[sm.mapMenu.currentIndex].action);

        draw.menu(sm, sm.gameStateMenu);
        draw.menu(sm, sm.mapMenu);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            // game state change?
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                console.log(button);
                smMod.setState(sm, button.action)
            }
        }
    }
});
