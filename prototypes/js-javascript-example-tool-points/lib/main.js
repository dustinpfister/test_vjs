// set up canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('area-canvas').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

// the event hander used when a tab section div is clicked
var tabClick = function(e){
    var i = parseInt( e.target.dataset.i );
    sm.currentTabIndex = i;
    // update canvas
    drawCurrentTabIndex();
    // update json text area
    tabIndexToJSON(sm, sm.currentTabIndex);
};

// render the tab selection menu for the current state of sm.tabs
var renderTabSelection = function(){
    var div = document.querySelector('#area-tab-selection');
    utils.removeAllChildNodes(div);
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
    var json = utils.jsonPretty(project);
    document.querySelector('#input-json').value = json;
};

// parse the JSON in the text area to the project at the given index if vaild
// else do not update the project
var jsonToTabIndex = function(sm, index){
    // get the raw txt
    var text = document.querySelector('#input-json').value,
    obj = null;
    try{
        obj = JSON.parse(text);
    }catch(e){
        // !!! display a message at least maybe
    }
    // if obj set to the tab
    if(obj){
        sm.tabs[index] = obj;
    }
};

// draw the current tab index to the canvas
var drawCurrentTabIndex = function(){
    draw.background(ctx, canvas, 'blue');
    var objects = sm.tabs[sm.currentTabIndex].objects;
    objects.forEach(function(obj){
        draw.points(ctx, obj, 0, 0);
    });
    draw.ver(sm, ctx, canvas);
};

// 'state machine' object
var sm = {
    ver: 'r2',
    currentTabIndex: 0, // current tab index
    tabs: [],
    selectors: [],
    currentState: 'init',
    stateObj: null,
    states: {}
};

var setState = function(sm, newState){
    if(sm.stateObj){
        
    }
    sm.currentState = newState;
    sm.stateObj = sm.states[sm.currentState];
    if(sm.stateObj.start){
        sm.stateObj.start.call(sm, sm);
    }
};

// init state should only run once, this state should be used to set things up for the first time
sm.states.init = {
    start: function(sm){
        // push start project(s)
        projectMod.pushNewProject(sm.tabs, 'BOX');
        projectMod.pushNewProject(sm.tabs, 'WEIRD');

        // render tab section and draw curent tab index for first time
        renderTabSelection()
        drawCurrentTabIndex();
        tabIndexToJSON(sm, sm.currentTabIndex);


        setState(sm, 'editProject');

    }
};

// edit a project
sm.states.editProject = {
    start: function(sm){

        // create 'selector' objects for each object in sm.tabs[sm.currentTabIndex].objects
        var tab = sm.tabs[sm.currentTabIndex];

        // selectors for each object
        sm.selectors = [];
        tab.objects.forEach(function(points, i){
            var centerPos = projectMod.getObjectCenter(tab, i);
            sm.selectors.push( Object.assign( { i: i, points: points, r: 16 }, centerPos ) );
        });
        console.log(sm.selectors[0]);

        draw.selectors(sm, ctx);

    },

    events: {
        pointerUp : function(){

        }
    }

};

// attach on key up event hander for text area
document.querySelector('#input-json').addEventListener('keyup', function(e){
    jsonToTabIndex(sm, sm.currentTabIndex);
    renderTabSelection()
    drawCurrentTabIndex();
});

setState(sm, 'init');





