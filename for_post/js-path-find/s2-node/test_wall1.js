let Grid = require('./grid/grid.js').Grid,
findPath = require('./grid/find-path.js'),
helpers = require('./grid/helpers.js');

let g = Grid.fromMatrix([
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: true,ti: 0},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: false,ti: 4},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: true,ti: 0},{walkable: true,ti: 0},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: true,ti: 0},{walkable: true,ti: 0}],
]);

helpers.setStartEnd(g, 0, 0, 2, 0);
helpers.print(g);
