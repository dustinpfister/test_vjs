var tradeMod = (function () {

    var ITEMS = {};

    ITEMS.raspberry = {
        desc : 'Raspberry',
        valueRange: [1, 10]
    };

    ITEMS.apple = {
        desc : 'Apple',
        valueRange: [3, 18]
    };

    ITEMS.kiwi = {
        desc : 'kiwi',
        valueRange: [1, 3.50]
    };

    var api = {};

    // create a player item object that will
    // contain data for the players collection
    // of items
    var createPlayerItemObject = function(opt){
        opt = opt || {};
        return {
            desc: opt.desc || '',
            count: opt.count || 0,
            avgCost: opt.avgCost || 0
        };
    };

    var createItemsObject = function(){
        var itemsObj = {};
        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey],
            vg = item.valueRange;
            itemsObj[itemKey] = {
                desc: item.desc,
                current: vg[0] + (vg[1] - vg[0]) * Math.random()
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

    return api;

}
    ());
