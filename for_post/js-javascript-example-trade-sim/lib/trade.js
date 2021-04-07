var tradeMod = (function () {

    var ITEMS = {};

    ITEMS.raspberry = {
        desc : 'Raspberry ',
        valueRange: [1, 10]
    };

    ITEMS.apple = {
        desc : 'Apple     ',
        valueRange: [3, 18]
    };

    ITEMS.kiwi = {
        desc : 'kiwi      ',
        valueRange: [1, 3]
    };

    var api = {};

    // create a player item object that will
    // contain data for the players collection
    // of items
    var createPlayerItemObject = function(opt){
        opt = opt || {};
        return {
            desc: opt.desc || '',
            count: opt.count || 0
        };
    };

    var createItemsObject = function(){
        var itemsObj = {};
        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey],
            vg = item.valueRange;
            itemsObj[itemKey] = {
                desc: item.desc,
                current: Math.round(vg[0] + (vg[1] - vg[0]) * Math.random())
            };
        });
        return itemsObj;
    };

    api.create = function () {
        // main state object
        var trade = {
            items_player: {},
            items: createItemsObject()
        };
        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey];
            trade.items_player[itemKey] = createPlayerItemObject({
                desc: item.desc
            });
        });
        return trade;
    };

    api.newValues = function(trade){
        trade.items = createItemsObject();
        return trade;
    };

    // buy the given itemKey and count, if there is enough state.money
    api.buy = function(trade, itemKey, count, state){
        var item = trade.items[itemKey],
        playerItem = trade.items_player[itemKey],
        totalCost = item.current * count;
        if(state.money >= totalCost){
            state.money -= totalCost;
            playerItem.count += count;
        }
    };

    api.sell = function(trade, itemKey, count, state){
        var item = trade.items[itemKey],
        playerItem = trade.items_player[itemKey];
        if(playerItem.count < count){
           count = playerItem.count
        }
        state.money += count * item.current;
        playerItem.count -= count;
    };

    return api;

}
    ());
