smMod.load({
    stateKey: 'title',
    update: function(sm, secs){

console.log('title state...')

        // switch to gameBuild state
        smMod.setState(sm, 'createNew');
    },
    draw: function(sm, ctx, canvas){},
    events: { click: function(e, pos, sm){}}
});
