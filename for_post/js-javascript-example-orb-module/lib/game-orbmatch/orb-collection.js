(function (api) {
    api.create = function (opt) {
        opt = opt || {};
        var collection = {
            orbs: [] // the main array of orb objects in this orb collection
        };
        return collection;
    };
}
    (this['OrbCollection'] = {}));
