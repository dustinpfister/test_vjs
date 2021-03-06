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

// push some objects to the map
sm.map.objects.push({
    x: 50,
    y: 45,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 20,
        fireRate: 1
    }
});

sm.map.objects.push({
    x: 520,
    y: 480,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 45,
        fireRate: 0.75
    }
});

sm.map.objects.push({
    x: 220,
    y: 720,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 90,
        fireRate: 0.25
    }
});

sm.states.mapMenu = {
    update: function(sm, secs){
        var state = this;
        mapMod.update(sm.map, secs);
    },
    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.map(ctx, sm.map)
    },
    pointer: {
        start: function(sm, pos, e){
            mapMod.on.start(sm.map, pos.x, pos.y);
        },
        move: function(sm, pos, e){
            mapMod.on.move(sm.map, pos.x, pos.y, sm.down);
        },
        end: function(sm, pos, e){
            if(!sm.map.moveMap.moving){
                var obj = mapMod.getObjectAt(sm.map, pos.x, pos.y);
                if(obj){
                    var gameOptions = Object.assign({canvas: canvas}, obj.gameOptions)
                    sm.game = gameMod.create(gameOptions);
                    sm.currentState = 'game';
                }
            }
            mapMod.on.end(sm.map, pos.x, pos.y);
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

