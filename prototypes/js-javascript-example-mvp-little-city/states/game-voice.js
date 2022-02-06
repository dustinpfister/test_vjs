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
        ctx.fillText('City Problems: ' , 28, 180);
        var x = 28, y = 200;
        Object.keys(sm.game.problems).forEach(function(key, i){
            var p = sm.game.problems[key];
            var percentStr = Math.round(p.index * 100) + '%';
            ctx.fillText(key + ': ' + percentStr , x, y + 17 * i);
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
