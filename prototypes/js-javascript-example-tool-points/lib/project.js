
var projectMod = (function(){

    var POINTS = {};

    //POINTS.BOX = pointMod.createBox({x: 320, y: 240, w: 250, h: 250, fill: 'rgba(255,255,255,0.5)'})

    POINTS.BOX = pointMod.createEllipse({points: 4, x: 320, y: 240})
    POINTS.LINE = [
        [25, 25, 50, 25, 50, 50, 25, 100, 'close:false', 'fill:false']
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

    // get the center of an object in the given project
    api.getObjectCenter = function(project, objectIndex){
        // just numbers of points
        var points = pointMod.numbersOnly( project.objects[objectIndex] );
        // get center positon of all lines
        var pos = points.reduce(function(acc, line){
           var i = 0,
           x = 0,
           y = 0,
           len = line.length;
           while(i < len){
               x += line[i];
               y += line[i + 1]
               i += 2;
           };
           x /= len / 2;
           y /= len / 2;
           acc.x += x;
           acc.y += y;
           return acc;
        }, {x:0, y:0});
        pos.x = Math.round(pos.x / points.length);
        pos.y = Math.round(pos.y / points.length); 
        // return postion
        return pos;
    };


    return api;

}());

