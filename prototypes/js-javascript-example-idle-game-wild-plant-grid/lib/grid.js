(function (api) {

    api.create = function (opt) {
        opt = opt || {};
        opt.xOffset = opt.xOffset === undefined ? 0 : opt.xOffset;
        opt.yOffset = opt.yOffset === undefined ? 0 : opt.yOffset;
        var grid = {};
        return grid;
    };

}
    (this['gridMod'] = {}))
