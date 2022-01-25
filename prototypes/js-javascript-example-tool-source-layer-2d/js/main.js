// source layer set up
var source = sourceLayer.create({
   canvas: '#canvas-source',
   width: 640, height: 480,
   onUpdate: function(source){
   }
});

sourceLayer.appendImageHandler(source, '#ui-background-image');
sourceLayer.appendZoomHandler(source, '#ui-background-zoom');
sourceLayer.appendRotationHandler(source, '#ui-background-rotation');

// out
document.querySelector('#ui-out').innerText = 'version: ' + sourceLayer.ver;

// draw layer
var canvas = document.querySelector('#canvas-draw'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
var sm = {
    canvas: canvas,
    ctx: ctx,
    down: false,
    size: 3,
    color: 'black'
};

var paintAt = function(sm, pos){
    var ctx = sm.ctx;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, sm.size, 0, Math.PI * 2);
    ctx.fill();
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

canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);

// clear button
document.getElementById('ui-draw-clear').addEventListener('click', function(){
   sm.ctx.clearRect(-1, -1, sm.canvas.width + 2, sm.canvas.height + 2);
});
