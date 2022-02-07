smMod.load({
    stateKey: 'createNew',
    update: function(sm, secs){

        //console.log('create new state');

        // switch to gameBuild state
        //smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);
        draw.menu(sm, sm.textInMenu);
        draw.ver(sm);

    },
    events: { 
        click: function(e, pos, sm){}
    }
});
