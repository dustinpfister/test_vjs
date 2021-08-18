// draw module
var draw = {};
// draw background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = '#444444';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw a single orb
draw.orb = function (sm, ctx, canvas, orb, fillStyle) {
    ctx.fillStyle = fillStyle || orb.data.fillStyle || 'white';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};
// draw basic info of an orb
draw.orbInfo = function (sm, ctx, canvas, orb, x, y) {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    if (orb.data.attackMode) {
        ctx.fillText('attack: ' + orb.data.attack.current, x, y);
    } else {
        ctx.fillText('heal: ' + orb.data.hp.heal, x, y);
    }
    ctx.fillText('hp: ' + orb.data.hp.current + '/' + orb.data.hp.max, x, y + 15);
    ctx.fillText('type: ' + orb.type, x, y + 30);
    ctx.fillText('ratio: ' + orb.ratio.join('-'), x, y + 45);
    ctx.fillText('points: ' + orb.points.join('-'), x, y + 60);
    ctx.fillText('level: ' + orb.level, x, y + 75);
};
// draw what the range of an orb is
draw.orbRange = function (sm, ctx, canvas, orb) {
    var x = orb.data.homeX - 16,
    yDelta = 16 * 7 + 9,
    xdelta = 0,
    y = orb.data.homeY - 16 - yDelta;
    ctx.strokeStyle = 'white';
    // range 1 box
    ctx.beginPath();
    ctx.rect(x, y, 32, 32 + yDelta);
    ctx.stroke();

    // range 2+ box
    var x1 = orb.data.inRangeOrbs[0].data.homeX - 16,
    x2 = orb.data.inRangeOrbs[orb.data.inRangeOrbs.length - 1].data.homeX - 16;
    ctx.beginPath();
    ctx.rect(x1, y, x2 - x1 + 32, 32);
    ctx.stroke();

};
// draw slot areas
draw.slotAreas = function (sm, ctx, canvas) {
    ctx.strokeStyle = 'black';
    ['player', 'ai'].forEach(function (faction) {
        var slots = sm.game[faction].slots;
        slots.orbs.forEach(function (orb) {
            var r = orb.radius;
            // fill base
            ctx.fillStyle = 'gray';
            if (faction === 'player' && sm.game.currentState === 'playerTurnOrbMenu' && orb.type === 'null') {
                ctx.fillStyle = sm.game.playerSlotFillStyle.color || 'gray';
            }
            ctx.fillRect(orb.data.homeX - r, orb.data.homeY - r, r * 2, r * 2);
            if (orb.type != 'null') {
                // draw attack mode arrow
                ctx.fillStyle = orb.data.attackMode ? 'red' : 'blue';
                var radian = orb.data.attackMode ? Math.PI * 2 : Math.PI * 1;
                radian = faction === 'ai' ? radian += Math.PI : radian;
                ctx.save();
                ctx.translate(orb.data.homeX, orb.data.homeY);
                ctx.rotate(radian);
                ctx.beginPath();
                ctx.moveTo(-16, -16);
                ctx.lineTo(0, -32);
                ctx.lineTo(16, -16);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // draw hp bar
                ctx.fillStyle = 'lime';
                ctx.fillRect(-16, 16, 32 * orb.data.hp.per, 5);
                ctx.restore();
            }
        });
    });
};
// draw slots info
draw.slotsInfo = function (sm, ctx, canvas) {
    ['player', 'ai'].forEach(function (faction) {
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = '10px arial';
        var yAI = sm.game.ai.slots.orbs[0].data.homeY;
        var yP = sm.game.player.slots.orbs[0].data.homeY;
        //ctx.fillText('attack: ' + sm.game.ai.totalAttack, 40, yAI - 32);
        //ctx.fillText('attack: ' + sm.game.player.totalAttack, 40, yP + 32);
        //ctx.fillStyle = 'blue';
        //ctx.fillText('heal: ' + sm.game.ai.totalHeal, 40, yAI - 42);
        //ctx.fillText('heal: ' + sm.game.player.totalHeal, 40, yP + 42);
    });
};
// draw orbCollection
draw.orbCollection = function (sm, ctx, canvas, pouch) {
    pouch.orbs.forEach(function (orb) {
        if (orb.type != 'null') {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb);
        } else {
            draw.orb(sm, sm.canvasObj.ctx, sm.canvasObj.canvas, orb, 'rgba(255,0,0,0.0)');
        }
    });
};
// draw a button
draw.button = function (button, ctx) {
    ctx.fillStyle = button.fillStyle || 'white';
    ctx.fillRect(button.x, button.y, button.w, button.h);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '10px arial';
    var x = button.x + button.w / 2,
    y = button.y + button.h / 2;
    ctx.fillText(button.disp, x, y);
};
// game state methods
draw.forGameState = {
    playerTurn: function (sm, ctx, canvas) {
        var orb = sm.game.selectedOrb;
        if (orb) {
            draw.orbInfo(sm, ctx, canvas, orb, 10, 10);
            draw.orbRange(sm, ctx, canvas, orb);
        }
    },
    playerTurnOrbMenu: function (sm, ctx, canvas) {
        draw.orbCollection(sm, ctx, canvas, sm.game.player.pouch);
    },
    playerTurnOrbConfig: function (sm, ctx, canvas) {},
    aiTurn: function (sm, ctx, canvas) {},
    processTurn: function (sm, ctx, canvas) {},
    gameOver: function (sm, ctx, canvas) {
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = '30px arial';
        ctx.fillText('Game Over', 30, 30);
    }
};
// draw the current game state
draw.gameState = function (sm, ctx, canvas) {
    draw.background(sm, ctx, canvas);
    draw.slotAreas(sm, ctx, canvas);
    draw.orbCollection(sm, ctx, canvas, sm.game.player.slots);
    draw.orbCollection(sm, ctx, canvas, sm.game.ai.slots);
    draw.slotsInfo(sm, ctx, canvas);
    // for current game state
    draw.forGameState[sm.game.currentState](sm, ctx, canvas);
    // buttons
    var state = sm.game.gameStates[sm.game.currentState],
    buttons = state.buttons;
    Object.keys(buttons).forEach(function (buttonKey) {
        var b = buttons[buttonKey];
        draw.button(b, ctx);
    });
};
