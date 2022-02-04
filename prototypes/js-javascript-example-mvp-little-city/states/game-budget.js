smMod.load({
    stateKey: 'gameBudget',
    data: {
       income: 0,
       moneyNextYear: 0
    },
    update: function(sm, secs){
        var sDat = sm.stateObj;
        gameMod.update(sm.game, secs);
        sDat.income = gameMod.getDeltaMoney(sm.game);
        sDat.moneyNextYear = sm.game.money + sDat.income;
    },
    draw: function(sm, ctx, canvas){
        draw.back(sm);
        draw.menu(sm, sm.gameStateMenu);
        draw.menu(sm, sm.budgetMenu);
        draw.disp(sm);
        draw.dispBudget(sm); // show budget display text
        draw.ver(sm);
    },
    events: {
        click: function(e, pos, sm){
            var game = sm.game;
            // was the budget menu clicked?
            var button = smMod.gridMenu.click(sm.budgetMenu, pos);
            if(button){
                var parts = button.action.split('_')
                // if a property tax button
                if(parts[0] === 'prop'){
                    var tr = game.taxRate.propertyTax; 
                    if(parts[1] === 'pos'){
                        tr += 0.01;
                    }else{
                        tr -= 0.01;
                    }
                    tr = parseFloat( tr.toFixed(2) );
                    tr = tr < 0 ? 0 : tr;
                    tr = tr > 0.20 ? 0.20 : tr;
                    game.taxRate.propertyTax = tr;
                }
            }
            // was the game state menu is clicked?
            var button = smMod.gridMenu.click(sm.gameStateMenu, pos);
            if(button){
                smMod.setState(sm, button.action)
            }
        }
    }
});
