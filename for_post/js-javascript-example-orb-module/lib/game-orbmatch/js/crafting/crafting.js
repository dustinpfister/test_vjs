(function (api) {


    var START_POUCH = [[8, 0, 8, 0],[0, 0, 16, 0],[64, 0, 0, 0]];



    /********* ********** ********** *********/
    //  HELPERS
    /********* ********** ********** *********/





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
    // start a new state, calling any hook methods when doing so 
    var setState = function(sm, newState){
        var oldState = sm.states[sm.currentState];
        var endHook = oldState.end;
        if(endHook){
            endHook.call(sm, sm);
        }
        sm.currentState = newState;
        var newState = sm.states[sm.currentState];
        var startHook = newState.start;
        if(startHook){
            startHook.call(sm, sm);
        }
    };




    /********* ********** ********** *********/
    //  CREATE 
    /********* ********** ********** *********/




    // create the main crafting object
    api.create = function(){
        var craft = {
            // create by raio settings
            createByRatio:{
                elementIndex: 0,
                ratio: [1, 0, 0, 0],
                level: 3
            },
            // the current pouch
            currentPouch:  OrbCollection.create({
                key: 'player-pouch-1',
                faction: 'player',
                count: 8,
                homeXStart: 192,
                homeYStart: 260,
                points: START_POUCH
            }),
            currentState: 'pouchEdit',
            states: states // ref to states objects
        };
        return craft;
    };


    /********* ********** ********** *********/
    //  STATES 
    /********* ********** ********** *********/




    var states = {};

    // pouch edit state
    states.pouchEdit = {
        buttons: {
            createOrb: {
                disp: 'Create Orb',
                x: 50,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    //console.log('create orb button click');
                    setState(craft, 'byRatio');
                }
            },
            deleteOrb: {
                disp: 'Delete Orb',
                x: 280,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    setState(craft, 'deleteOrb');
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
    // create orbs by ratio
    states.byRatio = {
        buttons: {
            back: {
                disp: 'back',
                x: 50,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    setState(craft, 'pouchEdit');
                }
            },
            elementIndexLoop: {
                disp: 'Next Index',
                x: 50,
                y: 50,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                   craft.createByRatio.elementIndex += 1;
                   craft.createByRatio.elementIndex %= 4;
                }
            },
            elementUp: {
                disp: 'el+',
                x: 130,
                y: 50,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    var cbr = craft.createByRatio;
                    var el = cbr.ratio[cbr.elementIndex];
                    el += 1;
                    el %= 21;
                    cbr.ratio[cbr.elementIndex] = el;

                }
            },
            elementDown: {
                disp: 'el-',
                x: 210,
                y: 50,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    var cbr = craft.createByRatio;
                    var el = cbr.ratio[cbr.elementIndex];
                    el -= 1;
                    el = el < 0 ? 20 : el;
                    cbr.ratio[cbr.elementIndex] = el;
                }
            },
            levelUp: {
                disp: 'level+',
                x: 130,
                y: 140,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    var cbr = craft.createByRatio;
                    var level = cbr.level;
                    level += 1;
                    level %= 100;
                    cbr.level = level;
                    //var el = cbr.ratio[cbr.elementIndex];
                    //el += 1;
                    //el %= 21;
                    //cbr.ratio[cbr.elementIndex] = el;

                }
            },
            levelDown: {
                disp: 'level-',
                x: 210,
                y: 140,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    var cbr = craft.createByRatio;
                    var level = cbr.level;
                    level -= 1;
                    level = level < 1 ? 1 : level;
                    cbr.level = level;
                }
            },
            craft: {
                disp: 'Craft',
                x: 280,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                   var cbr = craft.createByRatio;
                   var points = cbr.ratio;
                   points = points.map(function(el){
                        return el * Math.pow(2, cbr.level - 1);
                   });
                   // new orb collection
                   var noc = OrbCollection.create({
                          key: 'new-orb',
                          faction: 'player',
                          count: 1,
                          homeXStart: 0,
                          homeYStart: 0,
                          points: points
                     });
                  // new orb
                  var newOrb = noc.orbs[0];
                  // get next null
                  var i = 0;
                  while(i < 8){
                      if(craft.currentPouch.orbs[i].type === 'null'){
                          break;
                      }
                      i += 1;
                  }
                  if(i < 8){
                       OrbCollection.setOrbPropsToOrb(craft.currentPouch, i, newOrb);
                  }
console.log(api.getCurrentPoints(craft));
                }
            }
        },
        draw: function(craft, ctx, canvas){
            // draw state of craft.createByRatio
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline =  'top';
            ctx.font = '20px arial';
            var cbr = craft.createByRatio;
            ctx.fillText('element Index: ' + cbr.elementIndex, 350, 40);
            ctx.fillText('ratio: ' + cbr.ratio, 350, 60);
            ctx.fillText('level: ' + cbr.level, 350, 80);
        },
        events: {
            pointerStart: function (e, pos, craft) {
                buttonCheck(e, pos, craft);
            }
        }
    };
    // delete orbs
    states.deleteOrb = {
        buttons: {
            back: {
                disp: 'back',
                x: 50,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    setState(craft, 'pouchEdit');
                }
            }
        },
        draw: function(craft, ctx, canvas){},
        events: {
            pointerStart: function (e, pos, craft) {
                buttonCheck(e, pos, craft);
            }
        }
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




    /********* ********** ********** *********/
    //  OTHER PUBLIC METHODS
    /********* ********** ********** *********/




    api.getCurrentPoints = function(craft){
        return craft.currentPouch.orbs.map(function(orb){
            return orb.points;
        });
    };

}
    (this['craftingMod'] = {}));
