
var projectMod = (function(){

    var POINTS = {};

    POINTS.BOX = [
        [25, 25, 50, 25, 50, 50, 25, 50]
    ];
    POINTS.WEIRD = [
        [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
        [30, 80, 165, 55, 22, 200, 'fill:red']
    ];
    var POINTS_START = POINTS.BOX;

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
api.pushNewProject = function(tabs, startPoints){
    var n = tabs ? tabs.length : 0;
    var project = baseCreateProject();
    project.fileName = 'Untitled-' + n;

    var points = JSON.parse(JSON.stringify(POINTS_START));
    // start points
    if(typeof startPoints === 'string'){
        points = JSON.parse(JSON.stringify(POINTS[startPoints]));
    };
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