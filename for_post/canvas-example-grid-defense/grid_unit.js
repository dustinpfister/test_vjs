
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