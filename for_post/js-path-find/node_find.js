let Grid = require('./node_grid.js').Grid,
os = require('os');

// print a grid
let printGrid = (grid) => {
    var tiles = ['.', '+', 'S', 'E'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};

// set the tile index value for the given path
let setTileIndexValuesforPath = (grid, path, ti) => {
    ti = ti === undefined ? 0 : ti;
    path.forEach((pt) => {
        let node = grid.nodes[pt[1]][pt[0]];
        node.ti = ti;
    });
};

let setStartEnd = (grid, sx, sy, ex, ey) => {
    let startNode = grid.nodes[sx][sy],
    endNode = grid.nodes[ex][ey],
    p = grid.findPath(startNode, endNode);
    setTileIndexValuesforPath(grid, p, 1);
    startNode.ti = 2;
    endNode.ti = 3;
};

// new grid and path
let g = new Grid({
        w: 16,
        h: 9
    });

setStartEnd(g, 0, 0, 8, 12);

printGrid(g);
