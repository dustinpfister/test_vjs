var get = function(q){
    return document.querySelector(q);
};

// source layer set up
var source = sourceLayer.create({
   canvas: '#canvas-source',
   width: 640, height: 480,
   onUpdate: function(source){
   }
});
sourceLayer.createSourceUI(source, '#ui-background');

// out
get('#ui-out').innerText = 'version: ' + sourceLayer.ver;

// draw layer
var canvas = get('#canvas-draw'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
var sm = {
    canvas: canvas,
    ctx: ctx,
    down: false,
    size: 0.5,    // 0.25 to 20 with a 0.25 step
    tool: 'brush',
    color: '#000000'
};

var paintAt = function(sm, pos){
    var ctx = sm.ctx;
    if(sm.tool === 'brush'){
        ctx.beginPath();
        ctx.fillStyle = sm.color;
        ctx.arc(pos.x, pos.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
    }
    if(sm.tool === 'eraser'){
        ctx.save();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sm.size, 0, Math.PI * 2);
        ctx.clip();
        ctx.clearRect(pos.x - sm.size, pos.y - sm.size, sm.size * 2, sm.size * 2);
        ctx.restore();
    }
};

// get position helper
var getPos = function(e){
    var bx = e.target.getBoundingClientRect(),
    pos = {};
    if(e.touches){
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
    }else{
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    pos.x = pos.x - bx.left;
    pos.y = pos.y - bx.top;
    return pos;
};

var pointerDown = function(e){
    sm.down = true;
    paintAt(sm, getPos(e));
};
var pointerMove = function(e){
    if(sm.down){
        paintAt(sm, getPos(e));
    }
};
var pointerUp = function(e){
    sm.down = false;
};
var pointerOut = function(e){
    sm.down = false;
};

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);

canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchmove', pointerMove);
canvas.addEventListener('touchend', pointerUp);

canvas.addEventListener('pointerout', pointerOut);

// clear button
get('#ui-draw-clear').addEventListener('click', function(){
   sm.ctx.clearRect(-1, -1, sm.canvas.width + 2, sm.canvas.height + 2);
});
// tool select
get('#ui-draw-tool').addEventListener('input', function(e){
    console.log(e.target.value);
    sm.tool = e.target.value;
});
// color select
get('#ui-draw-color').addEventListener('input', function(e){
    sm.color = e.target.value;
});
sm.color = get('#ui-draw-color').value;
// size select
var sizeUpdate = function(){
    var size = parseFloat( get('#ui-draw-size').value );
    sm.size = size;
    get('#ui-draw-size-disp').innerText = size;
};
get('#ui-draw-size').addEventListener('input', function(e){
    sizeUpdate();
});
sizeUpdate();