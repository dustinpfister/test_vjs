
var gameMod = (function () {

    // hard coded settings
    var hardSet = {
        // max seconds for sec value used in updates
        maxSecs: 0.25,
        // deltaNext and levelCap for main game.levelObj
        deltaNext: 5000,
        levelCap: 1000,
        // save string
        saveStringVer: 'v1'
    };

    var api = {};

    // SAVE STATES

    // create a save string from a game object
    var saveStringVersions = {
        v0: ['damage'],
        v1: ['damage', 'mapIndex', 'skillPoints']
    };
    var saveStringParts = {
        damage: {
            encode: function (game) {
                var damage = Math.floor(Number(game.totalDamage));
                return damage.toString(36);
            },
            apply: function (game, partString) {
                var damage = parseInt(partString, 36);
                if (damage > 0) {
                    game.totalDamage = damage;
                    console.log('applying damage: ' + game.totalDamage);
                }
            }
        },
        mapIndex: {
            encode: function (game) {
                return Number(game.mapLevelObj.level).toString(36);
            },
            apply: function (game, partString) {
                // set up map level from saveString part which should be a base36 level number
                var level = parseInt(partString, 36);
                if (level >= 1) {
                    game.mapXP = XP.parseByLevel(level, game.mapLevelCap, game.mapDeltaNext).xp;
                }
            }
        },
        skillPoints: {
            encode: function (game) {
                var str = '';
                // skill points
                Object.keys(game.skills).forEach(function (skillKey) {
                    str += game.skills[skillKey].points.toString(36) + '-';
                });
                return str;
            },
            apply: function (game, partString) {
                if (partString) {
                    var match = partString.match(/\w+/g);
                    if (match) {
                        console.log('applying skill point string:');
                        console.log(partString);
                        match.forEach(function (sp, i) {
                            game.skills['weapon_' + i].points = Number(parseInt(sp, 36));
                        });
                    }
                }
            }
        },
    };
    // create a save string from the given game object
    api.createSaveString = function (game, ver) {
        ver = ver || hardSet.saveStringVer;
        var str = '';
        saveStringVersions[ver].forEach(function (partKey) {
            str += saveStringParts[partKey].encode(game) + '.';
        });
        return ver + '.' + str;
    };
    // apply a save string to the given game object
    api.applySaveString = function (game, saveStr) {
        var parts = saveStr.split('.').map(function (part) {
                return part.replace(/\;/, '');
            });
        var ver = parts[0];
        saveStringVersions[ver].forEach(function (partKey, i) {
            saveStringParts[partKey].apply(game, parts[1 + i])
        });
    };

    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mapLevelObj: {
                level: 1
            },
            totalDamage: opt.damage || 0,
            maIndex: opt.mapIndex || 0,
            skills: opt.skills || {
                weapon_0: {
                    points: 0
                },
                weapon_1: {
                    points: 0
                },
                weapon_2: {
                    points: 0
                },
                weapon_3: {
                    points: 0
                }
            }
        };
        return game;
    };

    return api;

}
    ());
