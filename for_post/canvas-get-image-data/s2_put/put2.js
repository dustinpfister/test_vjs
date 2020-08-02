var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 32, 32);

// single yellow pixel
var data = new Uint8ClampedArray([ 255,255,0,255]);
var img = new ImageData( data,1,1)
ctx.putImageData( img, 1,1);



/*
var i = 0, px,x,y,
html =
while (i < imgData.data.length) {
    var px = imgData.data.slice(i, i + 4),
    x = i % imgData.width,
    y = Math.floor(i / imgData.width);
    console.log(px.join(','));
    i += 4;
}
*/
