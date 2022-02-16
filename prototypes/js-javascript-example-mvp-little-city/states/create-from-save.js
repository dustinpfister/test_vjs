smMod.load({
    stateKey: 'createFromSave',
    data: {},
    update: function(sm, secs){},
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);
        draw.menu(sm, sm.slotMenu);
        draw.ver(sm);
    },
    events: { 
        click: function(e, pos, sm){
            var sDat = sm.stateObj.data;
            var button = smMod.gridMenu.click(sm.slotMenu, pos);
            if(button){
                var gameOpt = sm.saves.slots[button.index];
                if(gameOpt){
                    // make sure the current index is set to this slot
                    sm.saves.currentIndex = parseInt(button.index);
                    // create new game object with the loaded gameOpt object and switch
                    // to the gameBuilt state
                    sm.game = gameMod.create(gameOpt);
                    smMod.setState(sm, 'gameBuild');
                }
            }
        }
    }
});
