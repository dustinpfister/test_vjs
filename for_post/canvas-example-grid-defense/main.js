// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);

    // set width and height
    canvas.width = 320;
    canvas.height = 240;

    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });

    canvas.addEventListener('click', function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        console.log(grid.getCellFromPoint(x, y));
    });

    console.log(grid.getCell(2, 2))

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid lines
    draw.gridCellLines(grid, ctx, 'white');

}
    ());
