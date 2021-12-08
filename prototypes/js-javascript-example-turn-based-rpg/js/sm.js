
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    canvas.className = 'canvas-layer'
    ctx.translate(0.5, 0.5);

    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }

    // state machine object
    var sm = {
        ver: '0.3.0',
        fps: 12,
        lt: new Date(),

        // states
        states:{},            // collection of state objects
        stateObj: null,       // ref to current state object
        currentState: 'game', // current state object key name

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

    // set the current state
    sm.setState = function(newStateKey){
        sm.currentState = newStateKey;
        sm.stateObj = sm.states[sm.currentState];
    };

    // call the given eventKey in the events object of the current state object
    sm.callStateEvent = function(eventKey, e, opt){
        var events = sm.stateObj.events;
        if(events){
            if(events[eventKey]){
                events[eventKey].call(sm, e, opt, sm)
            }
        }
    };

    // pointer events
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pointerDown = true;
            sm.callStateEvent('pointerStart', e, pos);

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


