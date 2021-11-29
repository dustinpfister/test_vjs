
var gridMod = (function () {

    // public api
    var api = {};

    // Polly fill the flat method ( if needed as always )
    // https://www.npmjs.com/package/array-flat-polyfill
    if (!Array.prototype.flat) {
        Object.defineProperty(Array.prototype, 'flat', {
            configurable: true,
            value: function flat() {
                var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
                return depth ? Array.prototype.reduce.call(this, function (acc, cur) {
                    if (Array.isArray(cur)) {
                        acc.push.apply(acc, flat.call(cur, depth - 1));
                    } else {
                        acc.push(cur);
                    }
                    return acc;
                }, []) : Array.prototype.slice.call(this);
            },
            writable: true
        });
    }

    // create a new grid method
    api.create = function (w, h) {
        // defaults for arguments
        w = w === undefined ? 8 : w;
        h = h === undefined ? 8 : h;
        // start grid object
        var grid = {
            w: w,
            h: h,
            cells: []
        },
        i = 0;
        // creating the grid
        while (i < grid.w * grid.h) {
            grid.cells.push({
                i: i,
                x: i % grid.w,
                y: Math.floor(i / grid.w)
            });
            i += 1;
        }
        return grid;
    };

    // get method
    api.get = function (grid, ix, y) {
        // if one argument is given
        if (arguments.length === 2) {
            return grid.cells[ix];
        }
        // using a formula to get the desired
        // element
        if (arguments.length === 3) {
            return grid.cells[y * grid.w + ix];
        }
        // returns the last cell by default
        return grid[grid.cells.length - 1];
    };

    return api;

}
    ());

var grid = gridMod.create(3, 3);
console.log(gridMod.get(grid, 1, 2)); // { i: 7, x: 1, y: 2 }

/*
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
return grid[grid.length - 1];
}
return grid;
};

var g = createGrid(4, 3);
console.log(g.get(1, 2)); // {i: 9, x: 1, y: 2}
*/
