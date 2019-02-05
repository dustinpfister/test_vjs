
let mod = {
 
    grid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
 
    w: 3,
 
    get: function (xi, y) {
 
        if (arguments.length < 1) {
            return [];
        }
 
        if (arguments.length === 1) {
 
            return this.grid[xi];
 
        } else {
 
            return this.grid[y * this.w + xi];
 
        }
 
    }
 
};
console.log(mod.get(1)); // 2
console.log(mod.get(2,1)); // 6
