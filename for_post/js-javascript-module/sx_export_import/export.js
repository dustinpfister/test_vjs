export let mod;

mod = {
    x: 0,
    y: 10,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};
