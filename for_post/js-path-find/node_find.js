let Grid = require('./node_grid.js').Grid,
os = require('os');

// print a grid
let printGrid = (grid)=> {
    var tiles = ['.', '+', 'S', 'E'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};

// set the tile index value for the given path
let setTileIndexValuesforPath = function(grid, path, ti){
    ti = ti === undefined ? 0 : ti;
    path.forEach((pt)=>{
        let node = grid.nodes[pt[1]][pt[0]];
        node.ti = ti;
    });
};

// new grid and path
let g = new Grid({w:16,h:9});
let p = g.findPath(g.nodes[0][0], g.nodes[8][12]);

setTileIndexValuesforPath(g, p, 1);
g.nodes[0][0].ti = 2;
g.nodes[8][12].ti = 3;

printGrid(g);

