let Grid = require('./lib_grid_node.js').Grid,
findPath = require('./lib_find_path_node.js'),
helpers = require('./lib_helpers.js');

let g = new Grid({
        w: 40,
        h: 8
    });

helpers.setStartEnd(g, 0, 0, 35, 7);
helpers.print(g);
