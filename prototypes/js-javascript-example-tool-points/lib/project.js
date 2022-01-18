
var projectMod = (function(){

var POINTS_BOX = [
    [25, 25, 50, 25, 50, 50, 25, 50]
];
var POINTS_WEIRD = [
    [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];
var POINTS_START = POINTS_BOX;

    // base clean project object
    var baseCreateProject = function(){
        var project = {
            fileName: '', // the file name for this project
            objects: []   // the array of points objects
        };
        return project;
    };

    var api = {};

// push a new project into the given tabs array
api.pushNewProject = function(tabs){
    var n = tabs ? tabs.length : 0;
    var project = baseCreateProject();
    project.fileName = 'Untitled-' + n;
    // start points
    var points = JSON.parse(JSON.stringify(POINTS_START));
    project.objects.push(points);
    // puch the new project into tabs
    tabs.push(project);
    return tabs;
};  


    return api;

}());


/*
// literal of a points array
var points = [
    [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];

*/
