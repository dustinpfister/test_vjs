sm.states.title = {
    key: 'title',
    start: function(){
        utils.log('title start', 'debug');

var items = {};

utils.setPath(items, 'weapons.range.bow', { baseAttack: [1,1]});

console.log(items);

    },
    update: function(sm, secs){
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.titleText(sm);
        draw.ver(sm);
    },
    events: {
        pointerEnd: function(e, pos, sm){

            // change to game state
            sm.setState('game');
        }
    }
};