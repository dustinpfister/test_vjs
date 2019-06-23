var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 32, 32);
ctx.strokeStyle = 'green';
ctx.globalAlpha = 1;
ctx.lineWidth = 1;
ctx.strokeRect(3, 3, 5, 5);

var imgData = ctx.getImageData(3, 3, 5, 5);
//imgData.data[0] = 255;

imgData.data.forEach(function (v, i,data) {
    data[i] = v === 0 ? 0 : 255;
});

ctx.putImageData(imgData,3,3);

var i = 0;
while (i < imgData.data.length) {

    console.log(imgData.data.slice(i, i + 4));
    i += 4;
}
