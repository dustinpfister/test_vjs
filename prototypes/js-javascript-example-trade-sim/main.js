
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
            text += item.desc + ':\n';
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

    api.startNew(150);
    tradeMod.buy(game.trade, 'apple', 5, game);
    console.log(plainText(game));

}());

