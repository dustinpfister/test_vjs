sm.states.title = {
    key: 'title',
    start: function(sm){
        utils.log('title start', 'debug');


unitMod.loadItems(sm.data);

//var items = {};

//utils.setPath(items, 'weapons.range.bow', { baseAttack: [1,1]});

//console.log( utils.getPath(items, 'weapons', false) );
//console.log( utils.getPath(items, 'weapons.range', false) );
//console.log( utils.getPath(items, 'weapons.range.bow', false) );
//console.log( utils.getPath(items, 'weapons.range.bow.baseAttack', false) );


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