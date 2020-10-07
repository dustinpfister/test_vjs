var Point = function (x, y, render) {
    self = this;
    self.locals = {};
    self.render = render || function (point) {
        console.log('pos: ' + this.x + ',' + this.y);
    };
    self.state = 'init';
    ['x', 'y'].forEach(function (key) {
        Object.defineProperty(self, key, {
            get: function () {
                return self.locals[key];
            },
            set: function (newValue) {
                self.locals[key] = newValue;
                if (self.state == 'ready') {
                    self.render(self);
                }
            }
        });
    });
    self.x = x;
    self.y = y;
    self.state = 'ready';
    self.render(self);
};
var a = new Point(10, 10);
a.x = 15;
a.y = 5;
a.x += 5;
/*
pos: 10, 10
pos: 15, 10
pos: 15, 5
pos: 20, 5
*/