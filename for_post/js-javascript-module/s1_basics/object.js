var mod = {
    x: 0,
    y: 10,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};

mod.move(45, 7);
console.log(mod.x,mod.y); // 45 17