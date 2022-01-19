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

    // update json text area
    tabIndexToJSON(sm, sm.currentTabIndex);

    createObjectSelectors(sm);

    // update canvas
    //drawCurrentTabIndex();
    //draw.selectors(sm, ctx);

drawState(sm, ctx, canvas);

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

// check sm.selectors with the given pos and return an array of selectors that are in range
var selectorCheck = function(sm, pos){
    return sm.selectors.filter(function(sel){
        return utils.distance(sel.x, sel.y, pos.x, pos.y) < sel.r;
    });
};

var createObjectSelectors = function(sm){
        // create 'selector' objects for each object in sm.tabs[sm.currentTabIndex].objects
        var tab = sm.tabs[sm.currentTabIndex];
        // selectors for each object
        sm.selectors = [];
        tab.objects.forEach(function(points, i){
            var centerPos = projectMod.getObjectCenter(tab, i);
            sm.selectors.push( Object.assign( { i: i, points: points, r: 16 }, centerPos ) );
        });
};

// 'state machine' object
var sm = {
    ver: 'r3',

    // tabs
    currentTabIndex: 0, // current tab index
    tabs: [],

    // selector objects
    pointerDown: false,
    selectors: [],
    activeSelector: null,

    // states
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

var drawState = function(sm, ctx, canvas){
    var draw = sm.stateObj.draw; 
    if(draw){
        draw.call(sm, sm, ctx, canvas)
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

        createObjectSelectors(sm);

        //draw.selectors(sm, ctx);

        //sm.stateObj.draw.call(sm, sm, ctx, canvas)

        drawState(sm, ctx, canvas);

    },

    draw: function(sm, ctx, canvas){

        drawCurrentTabIndex();
        draw.selectors(sm, ctx);

    },

    events: {
        pointerdown : function(sm, pos, e){

            sm.activeSelector = null;
            var selectors = selectorCheck(sm, pos);
            if(selectors.length > 0){
                sm.activeSelector = selectors[0];
            }

        },
        pointermove : function(sm, pos, e){

            var sel = sm.activeSelector;
            if(sel){

               var delta = {};
               delta.x = pos.x - sel.x;
               delta.y = pos.y - sel.y;

               pointMod.translatePoints(sm.tabs[sm.currentTabIndex].objects[sel.i], delta.x, delta.y);

               Object.assign(sel, pos);

               //createObjectSelectors(sm);

               // draw
               //drawCurrentTabIndex();
               //draw.selectors(sm, ctx);

               drawState(sm, ctx, canvas);

               // update json
               tabIndexToJSON(sm, sm.currentTabIndex);

            }


        },
        pointerup : function(sm, pos, e){
            sm.activeSelector = null;
            // make sure selectors are centerd
            createObjectSelectors(sm);

            drawState(sm, ctx, canvas);
            //drawCurrentTabIndex();
            //draw.selectors(sm, ctx);
            //console.log(pos)

        }
    }

};

// attach on key up event hander for text area
document.querySelector('#input-json').addEventListener('keyup', function(e){
    jsonToTabIndex(sm, sm.currentTabIndex);
    renderTabSelection()

            createObjectSelectors(sm);
            //drawCurrentTabIndex();
            //draw.selectors(sm, ctx);

drawState(sm, ctx, canvas);

});


var createPointerEventHander = function(eventKey){
    return function(e){
        var events = sm.stateObj.events,
        pos = utils.getCanvasRelative(e);
        if(events){
            if(events[eventKey]){
                events[eventKey](sm, pos, e);
            }
        }
    }
};

canvas.addEventListener('pointerdown', createPointerEventHander('pointerdown') );
canvas.addEventListener('pointerup', createPointerEventHander('pointerup') );
canvas.addEventListener('pointermove', createPointerEventHander('pointermove') );

setState(sm, 'init');





