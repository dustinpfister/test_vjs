

(function () {

    // SETUP CANVAS

    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);

    // set width and height
    canvas.width = 320;
    canvas.height = 240;

    var state = {
        canvas: canvas,
        ctx: ctx,
        currentState: 'title'
    };

    // Draw Module
    var draw = (function () {

        // main draw method
        var api = function (state) {
            // clear screen
            api.cls(state);
            // draw current state
            api.state[state.currentState](state);
        };

        // 'clear screen' draw method
        api.cls = function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        // Draw methods for each state
        api.state = {};
        // title
        api.state.title = function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'white';
            ctx.font = '30px arial';
            ctx.textAlign = 'center';
            ctx.fillText('BREAKOUT', canvas.width / 2, canvas.height / 3);
        };

        return api;

    }
        ());

    draw(state);

}
    ());
