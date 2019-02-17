this.x = 5;
let move = dx => {
    this.x += dx;
}
move(10);
console.log(this.x); // 15
