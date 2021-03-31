let findGuy = (grid) => {
    let x,
    y = 0,
    guy = {};
    height: while (y < grid.h) {
        x = 0;
        width: while (x < grid.w) {
            let cell = grid.cells[y][x];
            if (typeof cell === 'object') {
                if (cell.type==='guy') {
                    guy = cell;
                    break height;
                }
            }
            x += 1;
        }
        y += 1;
    }
    if (guy.type === 'guy') {
        guy.x = x;
        guy.y = y;
    }
    return guy;
};
console.log(findGuy({
        w: 3,
        h: 3,
        cells: [
            [0, 0, 0],
            [0, {type: 'guy'}, 0],
            [0, 0, 0]]
    }));
// { type: 'guy', x: 1, y: 1 }