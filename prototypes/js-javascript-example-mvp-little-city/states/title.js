smMod.load({
    stateKey: 'title',
    update: function(sm, secs){},
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);

        ctx.fillStyle = 'white';
        ctx.font = '60px arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Little City MVP', sm.canvas.width * 0.5, sm.canvas.height * 0.25);

        draw.menu(sm, sm.titleMenu);
        draw.ver(sm);
    },
    events: { 
         click: function(e, pos, sm){
            // if title menu clicked
            var button = smMod.gridMenu.click(sm.titleMenu, pos);
            if(button){
                smMod.setState(sm, button.action)
            }
        }
    }
});
