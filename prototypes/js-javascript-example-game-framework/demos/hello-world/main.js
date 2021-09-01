// to create an object pool with default hard coded settings
var pool = poolMod.create();
console.log( pool.objects.length ) // 10
console.log( JSON.stringify( pool.objects[0] ) );
// {"active":false,"i":0,"x":0,"y":0,"w":32,"h":32,"heading":0,"pps":32,"lifespan":3,"data":{}}



// create an sm object
var sm = gameFrame.smCreateMain({
    currentState: 'game', // set starting state object to use
    width: 640,
    height: 480,
    game: {
        text: 'Hello World',
        pool: poolMod.create({
            count: 3
        }),
        cx: 160,
        cy: 120,
        x: 0,
        y: 0,
        dir: 1,
        dx: 0,
        printOptions: {
            align: 'center',
            baseLine: 'middle',
            fontSize: 30
        },
        pointerDown: false
    }
});

// creating points
var points = canvasMod.createPoints(sm.layers, 'circle', 0, 0, 5);
console.log(points);

console.log(sm.game.pool);


// add at least one state object
gameFrame.smPushState(sm, {
    name: 'game',
    // start hook will just fire once when the state object starts
    start: function(sm){
        canvasMod.draw(sm.layers, 'background', 0);
    },
    // what to do on each update
    update: function(sm, secs){
        sm.game.dx += 64 * secs * sm.game.dir;
        if(sm.game.dx >= 32){
            sm.game.dx = 32;
            sm.game.dir = -1;
        }
        if(sm.game.dx <= -32){
            sm.game.dx = -32;
            sm.game.dir = 1;
        }
        sm.game.x = sm.game.cx + sm.game.dx;
        sm.game.y = sm.game.cy;;
    },
    // draw will be called after each update
    draw: function(sm, layers){
        canvasMod.draw(layers, 'clear', 1);
        canvasMod.draw(layers, 'print', 1, sm.game.text, sm.game.x, sm.game.y, sm.game.printOptions);
    },
    // events for this state
    events: {
        pointerStart: function(e, pos, sm){
            sm.game.pointerDown = true;
        },
        pointerMove: function(e, pos, sm){
            if(sm.game.pointerDown){
                sm.game.cx = pos.x;
                sm.game.cy = pos.y;
            }
        },
        pointerEnd: function(e, pos, sm){
            sm.game.pointerDown = false;
            sm.game.cx = 160;
            sm.game.cy = 120;
        }
    }
});
// start the state machine
gameFrame.smSetState(sm, 'game');
sm.loop();
