(function (api) {

    // sort a list of open nodes
    var sortOpen = function (open) {
        return open.sort(function (nodeA, nodeB) {
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
            path.push([node.x, node.y]);
            node = node.parent;
        }
        path.push([node.x, node.y]);
        return path;

    };

    // for Each Neighbor for the given grid, node, and open list
    var forNeighbors = function (grid, node, endNode, opened) {
        //var neighbors = grid.getNeighbors(node);
		var neighbors = gridMod.getNeighbors(grid, node);
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
        var grid = Grid.fromMatrix(givenGrid.nodes),
        path = [],
        opened = [],
        node;
        // set startNode and End Node to copy of grid
        var startNode = grid.nodes[sy][sx];
        endNode = grid.nodes[ey][ex];
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
            forNeighbors(grid, node, endNode, open);
            // sort the list of nodes be weight value to end node
            sortOpen(open);
        }
        // return an empty array if we get here (can not get to end node)
        return [];
    };

    // create a grid object
    api.create = function (opt) {
        opt = opt || {};
        var grid = {
            cellSelected: null, // selected cell ref
            cells: []
        };
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.w = opt.w === undefined ? 8 : opt.w;
        grid.h = opt.h === undefined ? 8 : opt.h;
        grid.xOffset = opt.xOffset === undefined ? 0 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 0 : opt.yOffset;
        var i = 0,
        cell,
        len = grid.w * grid.h;
        while (i < len) {
            cell = {
                i: i, // store index for this cell
                cellX: i % grid.w, // grid index pos values as uppercase X, and Y
                cellY: Math.floor(i / grid.w),
                walkable: true,
                closed: false,
                data: {}
                // user data object
            };
            // cell pixel pos values as lowercase x, and y
            cell.x = grid.xOffset + cell.cellX * grid.cellSize;
            cell.y = grid.yOffset + cell.cellY * grid.cellSize;
            grid.cells.push(cell);
            i += 1;
        }
        return grid;
    };
    // get method
    api.get = function (grid, ix, y) {
        if (arguments.length === 1) {
            return grid.cells[ix];
        }
        return grid.cells[y * grid.w + ix];
    };
    // get a cell by the given pixel position
    api.getCellByPixlePos = function (grid, x, y) {
        var cellX = Math.floor((x - grid.xOffset) / grid.cellSize),
        cellY = Math.floor((y - grid.yOffset) / grid.cellSize),
        cell;
        if (cellX >= 0 && cellY >= 0 && cellX < grid.w && cellY < grid.h) {
            return grid.cells[cellY * grid.w + cellX];
        }
        return null;
    };
    // selected cell check
    api.selectedCheck = function (grid, x, y, onSelect, onUnselect) {
        var cell = api.getCellByPixlePos(grid, x, y);
        if (cell) {
            if (cell === grid.cellSelected) {
                onUnselect(cell, grid, x, y);
                grid.cellSelected = null;
            } else {
                if (grid.cellSelected) {
                    onUnselect(grid.cellSelected, grid, x, y);
                }
                grid.cellSelected = cell;
                onSelect(cell, grid, x, y);
            }
        } else {
            if (grid.cellSelected) {
                onUnselect(grid.cellSelected, grid, x, y);
                grid.cellSelected = null;
            }
        }
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
}
    (this['gridMod'] = {}))
