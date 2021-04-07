
var TradeSim = (function(){

    var api = {};

    var game = {};

    // create a simple plain text view
    var plainText = function(game){
        var text = '';
        text += 'money: ' + game.money + '\n\n';
        Object.keys(game.trade.items).forEach(function(itemKey){
            var item = game.trade.items[itemKey],
            item_player = game.trade.items_player[itemKey];
            text += itemKey + ':\n';
            text += '    current cost : $' + item.current + '\n';
            text += '    on hand : ' + item_player.count + '\n\n';
        });
        return text;
    };

    api.startNew = function(money){
        game = {
            money: money || 100,
            trade : tradeMod.create()
        };
    };

    api.info = function(){
        console.log(plainText(game));
    };

    api.action = function(action, itemKey, count){
        if(action === 'buy' || action === 'sell'){
            tradeMod[action](game.trade, itemKey, count, game);
        }
        tradeMod.newValues(game.trade);
        api.info();
    };

    api.startNew(150);
    api.info();

    return api;

}());

