smMod.load({
    stateKey: 'title',
    update: function(sm, secs){

        //console.log('title state...')

        // switch to gameBuild state
        //smMod.setState(sm, 'createNew');
    },
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);

        ctx.fillStyle = 'white';
        ctx.font = '25px arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Little City MVP', sm.canvas.width * 0.5, sm.canvas.height * 0.25);


        draw.menu(sm, sm.titleMenu);

        draw.ver(sm);
    },
    events: { click: function(e, pos, sm){}}
});
