
let findGuy = (grid) => {

    let x,
    y = 0,
    guy = {};

    height: while (y < grid.h) {

        x = 0;
        width: while (x < grid.w) {

            let cell = grid.cells[y][x];

            if (typeof cell === 'object') {

                if (cell.guy) {

                    guy = cell;
                    guy.x = x;
                    guy.y = y;

                    break height;

                }

            }

            x += 1;
        }

        y += 1;
    }

    return guy;

};

console.log(findGuy({
        w: 3,
        h: 3,
        cells: [
            [0, 0, 0],
            [0, {
                    guy: true
                }, 0],
            [0, 0, 0]]
    }));

/*
let findGuy = (grid) => {

let y = 0,
x,
c = 0,
cell = {};

outer: while (y < grid.h) {
x = 0;
while (x < grid.w) {
cell = grid.cells[y * grid.w + x];
if (cell.guy) {
break outer;
}
c += 1;
x += 1;
}
y += 1;
}

if (cell.hp > 0) {
return {
guy: cell,
c: c
};
}
return {
guy: false,
c: c
};

};

console.log(findGuy({
h: 3,
w: 3,
cells: [0, 0, 0, 0, 0, 0, 0, 0, 0]
})); // {guy: false, c:9}

console.log(findGuy({
h: 3,
w: 3,
cells: [0, 0, {guy:true,hp:10}, 0, 0, 0, 0, 0, 0]
})); // { guy: { guy: true, hp: 10 }, c: 2 }

*/
