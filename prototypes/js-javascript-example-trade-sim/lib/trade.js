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

    api.create = function () {

        var trade = {
            items_player: {},
            items: {}
        };

        Object.keys(ITEMS).forEach(function(itemKey){
            var item = ITEMS[itemKey];
            trade.items_player[itemKey] = createPlayerItemObject({
                desc: item.desc
            });
        });

        return trade;

    };

    return api;

}
    ());
