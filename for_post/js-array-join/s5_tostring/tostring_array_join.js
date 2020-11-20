// lets start with a method that will create an object
// with a toString method that will return a desired
// string representation of the object.
var createDateObj = function (month, day, year) {
    return {
        day: day,
        month: month,
        year: year,
        toString: function () {
            return this.month + '/' + this.day + '/' + this.year;
        }
    };
};
// now I can create an array of objects with these toString methods
var numbers = [[3, 9, 2020], [2, 1, 2017], [2, 20, 2020]];
var dateObjects = numbers.map(function (set) {
    return createDateObj.apply(null, set);
});
console.log(dateObjects);
/*
[
    { day: 9, month: 3, year: 2020, toString: [Function: toString] },
    { day: 1, month: 2, year: 2017, toString: [Function: toString] },
    { day: 20, month: 2, year: 2020, toString: [Function: toString] }
]
*/
// once I have the array of objects with toString methods I can just call Array.join
// to get a string with the string value for each object, and the given separator
// string between each string of the object
var str = dateObjects.join(' - ');
console.log(str); // 3/9/2020 - 2/1/2017 - 2/20/2020