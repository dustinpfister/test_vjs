smMod.load({
    stateKey: 'createNew',
    data: {
        mode: 'diff'  // 'diff' mode for selecting game difficulty, and 'name' mode for setting a name for the city
    },
    update: function(sm, secs){

        //console.log('create new state');

        // switch to gameBuild state
        //smMod.setState(sm, 'gameBuild');
    },
    draw: function(sm, ctx, canvas){
        var sDat = sm.stateObj.data;
        draw.back(sm);
        if(sDat.mode === 'diff'){
            draw.menu(sm, sm.selectDiffMenu);
        }
        if(sDat.mode === 'name'){
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.font = '30px arial';
            ctx.fillText(sm.game.name, sm.canvas.width * 0.5, 100);
            draw.menu(sm, sm.textInMenu);
        }
        draw.ver(sm);

    },
    events: { 
        click: function(e, pos, sm){
            var sDat = sm.stateObj.data;

            if(sDat.mode === 'diff'){
                var button = smMod.gridMenu.click(sm.selectDiffMenu, pos);
                if(button){
                    console.log(button);
                    sm.game.money = button.money;
                    sDat.mode = 'name';
                }
            }

            if(sDat.mode === 'name'){
                var button = smMod.gridMenu.click(sm.textInMenu, pos);
                if(button){
                    console.log(button);
                    //smMod.setState(sm, button.action)
                }
            }
        }
    }
});
