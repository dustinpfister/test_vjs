smMod.load({
    stateKey: 'createNew',
    data: {
        mode: 'diff'  // 'diff' mode for selecting game difficulty, and 'name' mode for setting a name for the city
    },
    update: function(sm, secs){},
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

            if(sDat.mode === 'name'){
                var button = smMod.gridMenu.click(sm.textInMenu, pos);
                if(button){
                    var str = sm.game.name,
                    code = button.key.charCodeAt(0); 

                    // if letter, number, or space
                    if( (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 32){
                        str += button.key;
                        sm.game.name = str;
                    }

                    // if # ( END )
                    if( code === 35 ){

                        //if(sm.game.name.length >= 1 && sm.game.name[0] != ' '){
                            smMod.setState(sm, 'gameBuild')
                        //}

                    }

                    // if < ( DEL )
                    if( code === 60 ){
                        if(str.length > 0){
                            var arr = str.split('');
                            arr.splice(arr.length - 1, 1);
                            sm.game.name = arr.join('')
                        }
                    }
                }
            }

            if(sDat.mode === 'diff'){
                var button = smMod.gridMenu.click(sm.selectDiffMenu, pos);
                if(button){
                    console.log(button);
                    sm.game.money = button.money;
                    sDat.mode = 'name';
                }
            }

        }
    }
});
