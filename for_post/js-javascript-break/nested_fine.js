
// return a grid with flat cells array
let flat = (grid) => {
    let gridC = JSON.parse(JSON.stringify(grid)),
    c = [];
    gridC.cells.forEach((cells) => {
        cells.forEach((cell) => {
            c.push(cell);
        });
    });
    gridC.cells = c;
    return gridC;
};

let findGuy = (grid) => {
    return flat(grid).cells.find((cell) => {
        if (typeof cell === 'object') {
            if (cell.type === 'guy') {
                return true
            }
        }
    });
};

console.log(findGuy({
        w: 3,
        h: 3,
        cells: [
            [0, 0, 0],
            [0, {
                    type: 'guy'
                }, 0],
            [0, 0, 0]]
    }));
