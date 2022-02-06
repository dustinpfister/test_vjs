smMod.load({
    stateKey: 'gameVoice',
    update: function(sm, secs){
        gameMod.update(sm.game, secs)
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.menu(sm, sm.gameStateMenu);
        ctx.fillStyle = 'yellow';
        ctx.font = '15px arial';
        var x = 28, y = 128;
        Object.keys(sm.game.totals).forEach(function(key, i){
            ctx.fillText(key + ':' + sm.game.totals[key] , x, y + 17 * i);
        });
        draw.disp(sm);
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            // game state change?
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                smMod.setState(sm, button.action)
            }
        }
    }
});
