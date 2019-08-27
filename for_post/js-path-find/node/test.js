let Grid = require('./grid/grid.js').Grid,
findPath = require('./grid/find-path.js'),
helpers = require('./grid/helpers.js');

let g = new Grid({
        w: 40,
        h: 8
    });

helpers.setStartEnd(g, 0, 0, 35, 7);
helpers.print(g);
