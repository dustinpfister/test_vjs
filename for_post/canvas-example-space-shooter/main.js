var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var applyBounds = function(pt){
	
	if(pt.x < 0){
		
		pt.x = 320 - 16 - Math.abs(-330) % 320
		
	}
	
	
};

var ship = {
    x: 0,
    y: 0,
    heading: 0,
    pps: 32,
    update: function (t) {
        t = t === undefined ? 0 : t;
        t = t / 1000;
        var delta = this.pps * t;
        this.x += Math.cos(this.heading) * delta;
        this.y += Math.cos(this.heading) * delta;
    }
};

var lt = new Date();

var update = function () {

    var now = new Date(),
    t = now - lt;

};

var draw = function () {};

var loop = function () {

    requestAnimationFrame(loop);

};

loop();
