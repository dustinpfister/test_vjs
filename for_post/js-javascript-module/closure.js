// declaring point global variable
var point;

// having another point variable in a 
// Immediately Invoked Function Expression
(function () {
    var point = {
        x: 5,
        y: 17
    };
    console.log(point); // {x:5,y:17}
}
    ());

// point global is still undefined
// there are two point variables because
// of  function level scope
console.log(point); // undefined
