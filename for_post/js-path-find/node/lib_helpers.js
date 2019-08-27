let findPath = require('./lib_find_path_node.js'),
os = require('os');

// print a grid
exports.print = (grid) => {
    var tiles = ['.', '+', 'S', 'E'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};

// set the tile index value for the given path
exports.setTileIndexValuesforPath = (grid, path, ti) => {
    ti = ti === undefined ? 0 : ti;
    path.forEach((pt) => {
        let node = grid.nodes[pt[1]][pt[0]];
        node.ti = ti;
    });
};

exports.setStartEnd = (grid, sx, sy, ex, ey) => {
    let startNode = grid.nodes[sy][sx],
    endNode = grid.nodes[ey][ex],
    //p = grid.findPath(startNode, endNode);
    p = findPath(grid, startNode, endNode);
    this.setTileIndexValuesforPath(grid, p, 1);
    startNode.ti = 2;
    endNode.ti = 3;
};
