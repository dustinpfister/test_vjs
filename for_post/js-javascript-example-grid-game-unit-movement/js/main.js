(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }

    var sm = {
        ver: '0.8.0',
        fps: 12,
        lt: new Date(),
        game: gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            maps: [
                // TOP
                '111111111' + 
                '100000000' + 
                '103030000' + 
                '100000000' + 
                '100000000' + 
                '100000000' + 
                '100000001',

                '111111111' +
                '000000000' +
                '000000300' + 
                '000000000' + 
                '000000000' +
                '000000000' +
                '100100000',

                '111111111' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301',
                
                // middle
                '100000001' +
                '103000001' + 
                '100000000' + 
                '100000001' + 
                '100000001' + 
                '103000001' + 
                '100000001',

                '100100000' +
                '100111010' +
                '020001010' +
                '100101030' +
                '100100111' +
                '100100000' +
                '100100000',

                '000000001' +
                '000000001' +
                '000000031' +
                '000111111' +
                '111100031' +
                '000000001' +
                '000000001',
                
                // bottom   
                '100000001' + 
                '100000001' + 
                '100000001' + 
                '103000000' + 
                '100000000' + 
                '103030000' + 
                '111111111',

                '100100000' + 
                '100000000' + 
                '100000000' + 
                '000000000' + 
                '000000000' + 
                '000000300' + 
                '111111111',

                '000000001' + 
                '000000001' + 
                '000000001' + 
                '000000301' + 
                '000000001' + 
                '000000301' + 
                '111111111'
                
            ]

        }),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };

    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pointerDown = true;
            // call player pointer method in gameMod
            gameMod.playerPointer(sm.game, pos.x, pos.y);
        },
        move: function (sm, e) {
            sm.input.pos = utils.getCanvasRelative(e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
        }
    };

    var createPointerHandler = function (sm, type) {
        return function (e) {
            pointerHanders[type](sm, e);
        };
    };

    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

    // loop with frame capping set by sm.fps value
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.fps){
            gameMod.update(sm.game);
            draw.back(sm);
            draw.map(sm);
            draw.info(sm);
            sm.lt = now;
        }
    };

    loop();

}
    ());
