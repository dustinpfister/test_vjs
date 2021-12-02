var mapMod = (function () {
    // create Cells helper
    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                unit: false // reference to current unit here or false if empty
            });
            i += 1;
        }
        return cells;
    };
    // PUBLIC API
    var api = {};
    // create a new map object
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            margin: {
                x: opt.marginX == undefined ? 5 : opt.marginX,
                y: opt.marginY == undefined ? 5 : opt.marginY
            },
            cells: []
        };
        map.cells = opt.cells || createCells(map);
        return map;
    };
    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, x, y) {
        if (x < 0 || y < 0 || x >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + x];
    };
    // get a cell in the current map by way of
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };

/***
PATHS
***/

    // sort a list of open nodes
    var sortOpen = function (opened) {
        return opened.sort(function (nodeA, nodeB) {
            if (nodeA.weight < nodeB.weight) {
                return 1;
            }
            if (nodeA.weight > nodeB.weight) {
                return -1;
            }
            return 0;
        });
    };

    // set weight for a node
    var setWeight = function (endNode, neighbor) {
        return Math.sqrt(Math.pow(endNode.cellX - neighbor.cellY, 2) + Math.pow(endNode.cellY - neighbor.cellY, 2))
    };

    // build a path based an parent property
    var buildPath = function (node) {
        var path = [];
        while (node.parent) {
            path.push([node.cellX, node.cellY]);
            node = node.parent;
        }
        path.push([node.cellX, node.cellY]);
        return path;
    };

    // for Each Neighbor for the given grid, node, and open list
    var forNeighbors = function (grid, node, endNode, opened) {
        //var neighbors = grid.getNeighbors(node);
        var neighbors = mapMod.getNeighbors(grid, node);
        var ni = 0,
        nl = neighbors.length;
        while (ni < nl) {
            var neighbor = neighbors[ni];
            // if the neighbor is closed continue looping
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            // set weight for the neighbor
            neighbor.weight = setWeight(endNode, neighbor);
            // if the node is not opened
            if (!neighbor.opened) {
                neighbor.parent = node;
                opened.push(neighbor);
                neighbor.opened = true;
            }
            ni += 1;
        }
    };

    api.getPath = function (grid, sx, sy, ex, ey) {
        // copy the given grid
        //var grid = Grid.fromMatrix(givenGrid.nodes),
        var grid = utils.deepCloneJSON(grid),
        //var grid = utils.deepClone(grid, {
        //    forRecursive: function(){ return {} }
        //}),
        nodes = api.chunk(grid),
        path = [],
        opened = [],
        node;
        // set startNode and End Node to copy of grid
        var startNode = nodes[sy][sx];
        endNode = nodes[ey][ex];
        // push start Node to open list
        opened.push(startNode);
        startNode.opened = true;
        startNode.weight = 0;
        // start walking
        while (opened.length > 0) {
            // pop out next Node from open list
            node = opened.pop();
            node.closed = true;
            // if the node is the end node
            if (node === endNode) {
                return buildPath(node);
            }
            // loop current neighbors
            forNeighbors(grid, node, endNode, opened);
            // sort the list of nodes be weight value to end node
            sortOpen(opened);
        }
        // return an empty array if we get here (can not get to end node)
        return [];
    };

    // get a chunk form of a grid
    api.chunk = function (grid) {
        var arr = [],
        row,
        i = 0;
        while (i < grid.cells.length) {
            row = grid.cells.slice(i, i + grid.w);
            arr.push(row);
            i += grid.w;
        }
        return arr;
    };

    // return true if the given x and y position is in bounds
    api.isInBounds = function (grid, x, y) {
        return (x >= 0 && x < grid.w) && (y >= 0 && y < grid.h);
    };

    // is the given cell location walkable?
    api.isWalkable = function (grid, x, y) {
        if (api.isInBounds(grid, x, y)) {
            return api.get(grid, x, y).walkable; //grid.nodes[y][x].walkable;
        }
        return false;
    };

    // get the four Neighbors of a node
    api.getNeighbors = function (grid, node) {
        var x = node.cellX,
        y = node.cellY,
        neighbors = [];
        if (api.isWalkable(grid, x, y - 1)) {
            //neighbors.push(this.nodes[y - 1][x]);
            neighbors.push(gridMod.get(grid, x, y - 1));
        }
        if (api.isWalkable(grid, x, y + 1)) {
            //neighbors.push(this.nodes[y + 1][x]);
            neighbors.push(gridMod.get(grid, x, y + 1));
        }
        if (api.isWalkable(grid, x - 1, y)) {
            //neighbors.push(this.nodes[y][x - 1]);
            neighbors.push(gridMod.get(grid, x - 1, y));
        }
        if (api.isWalkable(grid, x + 1, y)) {
            //neighbors.push(this.nodes[y][x + 1]);
            neighbors.push(gridMod.get(grid, x + 1, y));
        }
        return neighbors;
    };

    // return the public API
    return api;
}
    ());
