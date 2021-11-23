let Point = function (x, y) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
};

console.log( new Point(5,7) );
console.log( new Point() );
console.log( new Point );
