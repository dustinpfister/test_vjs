(function (api) {

    // helpers

    // buttons
    var getButton = function (sm, x, y) {
        var state = sm.states[sm.currentState];
        var buttons = state.buttons;
        var keys = Object.keys(buttons);
        var i = 0,
        buttonKey,
        b,
        len = keys.length;
        while (i < len) {
            buttonKey = keys[i];
            b = buttons[buttonKey];
            if (utils.boundingBox(b.x, b.y, b.w, b.h, x, y, 1, 1)) {
                return b;
            }
            i += 1;
        }
        return null;
    };
    var buttonCheck = function (e, pos, sm) {
        var b = getButton(sm, pos.x, pos.y);
        if (b) {
            b.onClick.call(sm, e, pos, sm, b);
        }
    };

    var states = {};

    // pouch edit state
    states.pouchEdit = {
        buttons: {
            createOrb: {
                disp: 'Create Orb',
                x: 220,
                y: 200,
                w: 200,
                h: 64,
                onClick: function (e, pos, game, button) {
                    console.log('create orb button click');
                }
            }
        },
        start: function(craft){},
        end: function(craft){},
        update: function(craft, secs){},
        draw: function(craft, ctx, canvas){},
        events : {
            pointerStart: function (e, pos, craft) {
                buttonCheck(e, pos, craft);
            },
            pointerMove: function (e, pos, craft) {},
            pointerEnd: function (e, pos, craft) {}
        }
    };

    states.byRatio = {};

    states.deleteOrb = {};




    /********* ********** ********** *********/
    //  CREATE 
    /********* ********** ********** *********/




    // create the main crafting object
    api.create = function(){
        var craft = {
            currentState: 'pouchEdit',
            states: states // ref to states objects
        };
        return craft;
    };




    /********* ********** ********** *********/
    //  EVENT
    /********* ********** ********** *********/




    // emit an event of the given eventKey with the given values for event, pos, and craft
    api.emitStateEvent = function (eventKey, e, pos, craft) {
        var state = craft.states[craft.currentState];
        var handler = state.events[eventKey];
        if (handler) {
            handler.call(craft, e, pos, craft);
        }
    };

}
    (this['craftingMod'] = {}));
