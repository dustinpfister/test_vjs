let Grid = require('./lib_grid_node.js').Grid;

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

var setWeight = function (endNode, neighbor) {

    return Math.sqrt(Math.pow(endNode.x - neighbor.x, 2) + Math.pow(endNode.y - neighbor.y, 2))

};

// Find path from start node to end node
module.exports = function (givenGrid, startNode, endNode) {
    var grid = Grid.fromMatrix(givenGrid.nodes),
    path = [],
    open = [],
    node;
    startNode = grid.nodes[startNode.y][startNode.x];
    endNode = grid.nodes[endNode.y][endNode.x];

    open.push(startNode);
    startNode.opened = true;
    startNode.weight = 0;
    while (open.length > 0) {
        node = open.pop();
        node.closed = true;
        if (node === endNode) {
            while (node.parent) {
                path.push([node.x, node.y]);
                node = node.parent;
            }
            path.push([node.x, node.y]);
            return path;
        }
        var neighbors = grid.getNeighbors(node);
        var ni = 0,
        nl = neighbors.length;
        // loop current neighbors
        while (ni < nl) {
            var neighbor = neighbors[ni];
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            // set weight for the neighbor
            neighbor.weight = setWeight(endNode, neighbor);
            if (!neighbor.opened) {
                neighbor.parent = node;
                open.push(neighbor);
                neighbor.opened = true;
            }
            ni += 1;
        }
        sortOpen(open);
    }
    return [];
};
