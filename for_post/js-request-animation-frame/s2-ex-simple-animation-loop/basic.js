(function() {
 
  // a canvas view
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lt = new Date();
 
  canvas.width = 320;
  canvas.height = 240;
 
  document.body.appendChild(canvas);
 
  // a model
  var obj = {
      x: 0,
      y: 0,
      r: 15
    },
    frame = 0,
    maxFrame = 100;
 
  var update = function() {
 
    var per = frame / maxFrame,
      bias = 1 - Math.abs(0.5 - per) / 0.5,
      cx = canvas.width / 2,
      cy = canvas.height / 2,
      
      a = Math.PI * 2 * bias;
 
    obj.x = cx + Math.cos(a) * 100 * bias;
    obj.y = cy + Math.sin(a) * 50;
 
    frame += 1;
 
    if (frame >= maxFrame) {
 
      frame = frame % maxFrame;
 
    }
 
  };
 
  var draw = function() {
 
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
 
  };
 
  var loop = function() {
 
    requestAnimationFrame(loop);
 
    if (new Date() - lt >= 1000 / 60) {
 
      update();
      draw();
 
      lt = new Date();
 
    }
 
  };
 
  loop();
 
}());