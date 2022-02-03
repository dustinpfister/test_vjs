smMod.load({
    stateKey: 'gameBudget',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.menu(sm, sm.gameStateMenu);
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){


            // if game state menu is clicked
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                smMod.setState(sm, button.action)
            }
        }
    }
});
