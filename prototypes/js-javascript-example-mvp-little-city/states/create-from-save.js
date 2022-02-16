smMod.load({
    stateKey: 'createFromSave',
    data: {
    },
    update: function(sm, secs){},
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);
        draw.ver(sm);

    },
    events: { 
        click: function(e, pos, sm){
            var sDat = sm.stateObj.data;


        }
    }
});
