(function (api) {


    var START_POUCH = [[8, 0, 8, 0],[0, 0, 16, 0],[64, 0, 0, 0]];



    /********* ********** ********** *********/
    //  HELPERS
    /********* ********** ********** *********/




    /********* ********** ********** *********/
    //  CREATE 
    /********* ********** ********** *********/




    // create the main crafting object
    api.create = function(){

        var craft = utils.smCreateMin({
            currentState: 'pouchEdit',
            states : states
        });
        // non standard sm props for craft sm object
        craft.createByRatio = {
            elementIndex: 0,
            ratio: [1, 0, 0, 0],
            level: 3
        };
        craft.currentPouch =  OrbCollection.create({
            key: 'player-pouch-1',
            faction: 'player',
            count: 8,
            homeXStart: 192,
            homeYStart: 260,
            points: START_POUCH
        });
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
                    utils.smSetState(craft, 'byRatio');
                }
            },
            deleteOrb: {
                disp: 'Delete Orb',
                x: 280,
                y: 350,
                w: 80,
                h: 80,
                onClick: function (e, pos, craft, button) {
                    utils.smSetState(craft, 'deleteOrb');
                }
            }
        },
        start: function(craft){},
        end: function(craft){},
        update: function(craft, secs){},
        draw: function(craft, ctx, canvas){},
        events : {
            pointerStart: function (e, pos, craft) {
                utils.buttonCheck(e, pos, craft);
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
                    utils.smSetState(craft, 'pouchEdit');
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
                utils.buttonCheck(e, pos, craft);
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
                    utils.smSetState(craft, 'pouchEdit');
                }
            }
        },
        draw: function(craft, ctx, canvas){},
        events: {
            pointerStart: function (e, pos, craft) {
                utils.buttonCheck(e, pos, craft);
console.log('click in delete state!');
var orb = OrbCollection.getOrbAtPos(craft.currentPouch, pos.x, pos.y);
console.log(orb);

if(orb){
   orb.type = 'null';
}


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
            // ensure [0,0,0,0] if null
            if(orb.type === 'null'){
                return [0, 0, 0, 0];
            }
            return orb.points;
        });
    };

}
    (this['craftingMod'] = {}));
