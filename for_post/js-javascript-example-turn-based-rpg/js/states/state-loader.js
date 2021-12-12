sm.states.loader = {
    key: 'loader',
    start: function(sm){

        sm.setState('title');

    },
    end: function(sm){

    },
    update: function(sm, secs){

    

    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.ver(sm);
    }
};