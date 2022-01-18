// set up canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('area-canvas').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

// 'state machine' object
var sm = {
    ver: 'r1',
    currentTabIndex: 0, // current tab index
    tabs: []
};

// remove all child nodes
var removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// the event hander used when a tab section div is clicked
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

// parse the given tab index to JSON in the area-json div
var tabIndexToJSON = function(sm, index){

    var project = sm.tabs[index];
    var json = JSON.stringify(project);

    document.querySelector('#input-json').value = json;

};

// draw the current tab index to the canvas
var drawCurrentTabIndex = function(){
    draw.background(ctx, canvas, 'blue');
    draw.points(ctx, sm.tabs[sm.currentTabIndex].objects[0], 80, 5);
    draw.ver(sm, ctx, canvas);
};

// push start project(s)
projectMod.pushNewProject(sm.tabs, 'BOX');
projectMod.pushNewProject(sm.tabs, 'WEIRD');

// render tab section and draw curent tab index for first time
renderTabSelection()
drawCurrentTabIndex();
tabIndexToJSON(sm, sm.currentTabIndex);

