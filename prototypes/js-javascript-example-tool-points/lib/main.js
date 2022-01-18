
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('area-canvas').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var sm = {
    ver: 'r1',
    currentTabIndex: 0, // current tab index
    tabs: []
};


var removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var tabClick = function(e){
    var i = parseInt( e.target.dataset.i );
    sm.currentTabIndex = i;
    drawCurrentTabIndex();
};

// render the tab selection menu for the current state of sm.tabs
var renderTabSelection = function(){
    var div = document.querySelector('#area-tab-selection');
    removeAllChildNodes(div);
    sm.tabs.forEach(function(project, i){
         var div_tab = document.createElement('div');
         div_tab.className = 'tab';
         div_tab.dataset.i = i;
         div_tab.innerText = project.fileName;
         div_tab.addEventListener('click', tabClick);
         div.appendChild(div_tab);
    });
};

// draw
var drawCurrentTabIndex = function(){
    draw.background(ctx, canvas, 'blue');
    draw.points(ctx, sm.tabs[sm.currentTabIndex].objects[0], 80, 5);
    draw.ver(sm, ctx, canvas);
};



// push start project
projectMod.pushNewProject(sm.tabs, 'BOX');
projectMod.pushNewProject(sm.tabs, 'WEIRD');
renderTabSelection()

drawCurrentTabIndex();

/*
// literal of a points array
var points = [
    [25, 75, 175, 50, 17, 210, 'fill:green', 'stroke:lime'],
    [30, 80, 165, 55, 22, 200, 'fill:red']
];

// method that will create a points array
var demoMethod = function () {
    var i = 0,
    radius = 100,
    radian,
    arr,
    x,
    y,
    count = 8,
    points = [];
    while (i < count) {
        radian = Math.PI * 2 / count * i;
        x = Math.cos(radian) * radius;
        y = Math.sin(radian) * radius;
        arr = [Math.round(x), Math.round(y), 0, 0, 'stroke:white', 'close:false', 'lineWidth:' + (2 + i * 2)];
        points.push(arr);
        i += 1;
    }
    return points
};

draw.background(ctx, canvas, 'blue');
draw.points(ctx, points, 80, 5);
draw.ver(sm, ctx, canvas);
draw.points(ctx, demoMethod(), 300, 150);

*/
