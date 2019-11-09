var Layers = function (obj) {

    // options
    obj = obj || {};
    this.container = obj.container || document.body;
    this.layerCount = obj.layerCount || 3;
    this.layerWidth = obj.layerWidth || 320;
    this.layerHeight = obj.layerHeight || 240;
    this.layers = [];

    // set container position to absolute
    this.container.style.position = 'absolute';

    // create layers
    var i = 0,
    canvas,
    ctx;
    while (i < this.layersCount) {
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = this.layerWidth;
        canvas.height = this.layerHeight;
        canvas.style.position = 'absolute';
        this.container.appendChild(canvas);
        this.layers.push({
            canvas: canvas,
            ctx: ctx
        });
        i += 1;
    }

};

Layers.prototype.drawToLayer = function (draw, index) {

    draw = draw || function () {};
    index = index === undefined ? 0 : index;

    var layer = this.layers[index];
    draw.call(layer, layer.ctx, layer.canvas);

};
