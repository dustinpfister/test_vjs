smMod.load({
    stateKey: 'createNew',
    update: function(sm, secs){

        console.log('create new state');

        // switch to gameBuild state
        smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
