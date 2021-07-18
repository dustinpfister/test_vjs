var createGrid = function (w, h) {
    var grid = [],
    i = 0;
    w = w || 8;
    h = h || 6;
    // creating the grid
    while (i < w * h) {
        grid.push({
            i: i,
            x: i % w,
            y: Math.floor(i / w)
        });
        i += 1;
    }
    // I can append a method to grid,
    // because arrays are still objects
    grid.get = function (ix, y) {
 
        if (arguments.length === 1) {
            return grid[ix];
        }
        // using a formula to get the desired
        // element
        if (arguments.length === 2) {
            return grid[y * w + ix];
        }
 
        return grid[grid.length-1];
 
    }
    return grid;
};
var g = createGrid(4, 3);
console.log(g.get(1,2)); {i: 9, x: 1, y: 2}