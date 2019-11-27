
var Enemy = function (opt) {
    opt.board = opt.board || new UnitGrid();
};

Enemy.prototype.update = function (ticks) {};

var UnitGrid = function (opt) {

    opt = opt || {};

    // same base properties
    Object.assign(this, new Grid(opt));

    this.maxEnemies = opt.maxEnemies || 10;
    this.tickRate = opt.tickRate === undefined ? 1000 / 4 : opt.tickRate;
    this.enemyCount = 0;
    this.lastTick = new Date();

};

UnitGrid.prototype = Object.create(new Grid());

UnitGrid.prototype.spawn = function () {
    if (this.enemyCount < this.maxEnemies) {
        var y = 0,
        len = this.cellHeight,
        options = [],
        cell;
        while (y < len) {
            cell = this.getCell(this.cellWidth - 1, y);
            if (!cell.enemy) {
                options.push(cell);
            }
            y += 1;
        }
        if (options.length > 0) {

            cell = options[Math.floor(Math.random() * options.length)];
            cell.enemy = new Enemy({
                    board: this
                });

        }
    }
};

UnitGrid.prototype.update = function () {
    var i = 0,
    now = new Date(),
    t = now - this.lastTick,
    ticks = t / this.tickRate,
    len = this.cells.length,
    cell;
    // update cells if ticks >= 1
    if (ticks >= 1) {
        this.enemyCount = 0;
        while (i < len) {
            cell = this.cells[i];
            if (cell.enemy) {
                this.enemyCount += 1;
                cell.enemy.update(ticks);
            }
            i += 1;
        }
        this.spawn();
        this.lastTick = now;
    }
};

var state = {
    money: 100,
    grid: new UnitGrid({
        xOffset: 15,
        yOffset: 25,
        cellSize: 32,
        cellWidth: 9
    })

};

// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);

    // set width and height
    canvas.width = 320;
    canvas.height = 240;

    // creating a grid instance

    canvas.addEventListener('click', function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        console.log(state.grid.getCellFromPoint(x, y));
    });

    var loop = function () {

        requestAnimationFrame(loop);

        state.grid.update();

        // fill black
        draw.cls(ctx, canvas);

        // draw grid lines
        draw.gridCellLines(state.grid, ctx);

    };
    loop();

}
    ());
