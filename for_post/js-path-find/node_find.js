let Grid = require('./grid.js'),
os = require('os');

// print a grid
let printGrid = (grid)=> {
    var tiles = ['.', 'S', 'E', '#'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};


let g = new Grid();
let p = g.findPath(g.nodes[1][1], g.nodes[3][4])

console.log(p);
//printGrid(g);

