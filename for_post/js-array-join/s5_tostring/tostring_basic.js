var obj = {
    day: 9,
    month: 3,
    year: 2020,
    toString: function () {
        return this.month + '/' + this.day + '/' + this.year;
    }
};

console.log( obj.toString() ); // '3/9/2020'
console.log( 'date: ' + obj ); // 'date: 3/9/2020'
