var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
    currentState: 'mapMenu',
    game: {},
    map: mapMod.create(),
    states: {},
    pos: {},
    down: false
};


sm.states.mapMenu = {

    moveMap: {
        startPos: {x: 0, y: 0},
        dist: 0,
        moveing: false
    },

    update: function(sm, secs){
        var state = this;
        mapMod.update(sm.map, sm, secs)
/*
        if(state.moveMap.moving){
            if(sm.pos.y > state.moveMap.y){
                sm.map.yOffset += 5;
            }
            if(sm.pos.y < state.moveMap.y){
                sm.map.yOffset -= 5;
            }
            sm.map.yOffset = sm.map.yOffset > sm.map.yMax ? sm.map.yMax : sm.map.yOffset;
            sm.map.yOffset = sm.map.yOffset < 0 ? 0 : sm.map.yOffset;
        }
*/
    },

    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.map(ctx, sm.map)
    },

    pointer: {
        start: function(sm, pos, e){
            var map = sm.map;
            mapMod.on.down(map, pos.x, pos.y);
            //map.moveMap.x = pos.x;
            //map.moveMap.y = pos.y;
            //map.moveMap.dist = 0;
            //map.moveMap.moving = false;
        },
        move: function(sm, pos, e){
            var map = sm.map;
            if(sm.down){
                map.moveMap.dist = utils.distance(pos.x, pos.y, map.moveMap.x, map.moveMap.y);
                map.moveMap.moving = false;
                if(map.moveMap.dist >= 50){
                    map.moveMap.moving = true;
                }
            }
        },
        end: function(sm, pos, e){
            var map = sm.map;
            if(!map.moveMap.moving){
                var obj = mapMod.getObjectAt(sm.map, pos.x, pos.y);
                if(obj){
                    var gameOptions = Object.assign({canvas: canvas}, obj.gameOptions)
                    sm.game = gameMod.create(gameOptions);
                    sm.currentState = 'game';
                }
            }
            map.moveMap.moving = false;
        }
    }

};

sm.states.game = {

    update: function(sm, secs){
        gameMod.updateTurretFacing(sm.game, secs);
        gameMod.updateShots(sm.game, secs);
    },

    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.turret(ctx, sm.game);
        draw.shots(ctx, sm.game);
    },

    pointer: {
        start: function(sm, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        },
        move: function(s, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        }
    }

};


var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);

    var state = sm.states[sm.currentState];
    state.update.call(state, sm, secs);
    state.draw.call(state, ctx, canvas, sm);

    lt = now;
};
loop();

var createPointerHandler = function(sm, eventType){
    return function (e) {
        var pos = sm.pos = utils.getCanvasRelative(e),
        state = sm.states[sm.currentState],
        pointer = state.pointer;
        if(eventType === 'start'){
            sm.game.down = true;
            sm.down = true;
        }
        if(eventType === 'end'){
            sm.game.down = false;
            sm.down = false;
        }
        if(pointer){
            if(pointer[eventType]){
                pointer[eventType].call(state, sm, pos, e, state);
            }
        }
    };
};

canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

