(function (api) {

    var states = {};

    states.pouchEdit = {};
    states.byRatio = {};
    states.deleteOrb = {};

    // create the main crafting object
    api.create = function(){
        var craft = {
            states: states // ref to states objects
        };
        return craft;
    };

}
    (this['craftingMod'] = {}));
