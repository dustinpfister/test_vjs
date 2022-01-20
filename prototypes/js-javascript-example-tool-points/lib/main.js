// set up canvas
var canvasObj = utils.createCanvas({
   container: document.getElementById('area-canvas')
}), canvas = canvasObj.canvas,ctx = canvasObj.ctx;
canvas.width = 640;
canvas.height = 480;

// the event hander used when a tab section div is clicked
var tabClick = function(e){
    var i = parseInt( e.target.dataset.i );
    sm.currentTabIndex = i;
    // update json text area
    tabIndexToJSON(sm, sm.currentTabIndex);
    createObjectSelectors(sm);
    // draw
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
    var objects = sm.tabs[sm.currentTabIndex].objects;
    objects.forEach(function(obj){
        draw.points(ctx, obj, 0, 0);
    });
};

// check sm.selectors with the given pos and return an array of selectors that are in range
var selectorCheck = function(sm, pos){
    return sm.selectors.filter(function(sel){
        return utils.distance(sel.x, sel.y, pos.x, pos.y) < sel.r;
    });
};

    // create 'selector' objects for each object in sm.tabs[sm.currentTabIndex].objects
var createObjectSelectors = function(sm){
    var tab = sm.tabs[sm.currentTabIndex];
    sm.selectors = [];
    tab.objects.forEach(function(points, i){
        var centerPos = projectMod.getObjectCenter(tab, i);
        sm.selectors.push( Object.assign( { i: i, points: points, r: 16 }, centerPos ) );
    });
};

// create 'selector' objects for each point in the current tab for the current active selector
var createPointSelectors = function(sm){
    var tab = sm.tabs[sm.currentTabIndex];
    if(sm.activeSelector){
        var object = sm.activeSelector.points;
        sm.selectors = [];
        pointMod.newChunked(object).forEach(function(line, li){
            line.forEach(function(ptArr, pi){
                var centerPos = { x: ptArr[0], y: ptArr[1] };
                sm.selectors.push( Object.assign( { i: null, li: li, pi: pi, points: object, r: 8 }, centerPos ) );
            });
        });
    }
};

// 'state machine' object
var sm = {
    ver: 'r5',
    // tabs
    currentTabIndex: 0, // current tab index
    tabs: [],
    // background
    background: {
        solid: '#0044af'
    },
    // ui
    userDown: false,
    sx: null, sy: null,
    tx: null, ty: null,
    moveDist: 0,
    // selector objects
    selectors: [],
    activeSelector: null,
    // states
    currentState: 'init',
    stateObj: null,
    states: {}
};

// set the current state
var setState = function(sm, newState){
    if(sm.stateObj){
        
    }
    sm.currentState = newState;
    sm.stateObj = sm.states[sm.currentState];
    if(sm.stateObj.start){
        sm.stateObj.start.call(sm, sm);
    }
};

// draw the current state by calling any draw method that it might have
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
        renderTabSelection();
        //drawCurrentTabIndex();
        tabIndexToJSON(sm, sm.currentTabIndex);
        setState(sm, 'editProject');
    }
};

// edit a project
sm.states.editProject = {
    start: function(sm){
        createObjectSelectors(sm);
        drawState(sm, ctx, canvas);
    },
    draw: function(sm, ctx, canvas){
        draw.background(ctx, canvas, sm.background);
        drawCurrentTabIndex();
        draw.selectors(sm, ctx);
        draw.ver(sm, ctx, canvas);
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
               drawState(sm, ctx, canvas);
               tabIndexToJSON(sm, sm.currentTabIndex);
            }
        },
        pointerup : function(sm, pos, e){
            // make sure selectors are centerd
            createObjectSelectors(sm);
            // is there a current active selector, and was
            // it clicked rather than moved?
            createObjectSelectors(sm);
            if(sm.activeSelector){
                if(sm.moveDist === 0){
                    setState(sm, 'editObject');
                }
            }else{
                setState(sm, 'view');
            }
            sm.activeSelector = null;
            drawState(sm, ctx, canvas);
        }
    }
};

// edit a project
sm.states.editObject = {
    start: function(sm){
        createPointSelectors(sm);
        drawState(sm, ctx, canvas);
        sm.activeSelector = null;
    },
    draw: function(sm, ctx, canvas){
        draw.background(ctx, canvas, sm.background);
        drawCurrentTabIndex();
        draw.selectors(sm, ctx);
        draw.ver(sm, ctx, canvas);
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
               // translate the single point
               pointMod.translatePT(sel.points, sel.li, sel.pi, delta.x, delta.y);
               Object.assign(sel, pos);
               drawState(sm, ctx, canvas);
               tabIndexToJSON(sm, sm.currentTabIndex);
            }
        },
        pointerup : function(sm, pos, e){
            if(sm.activeSelector === null){
                setState(sm, 'editProject');
            }else{
                createPointSelectors(sm);
            }
            sm.activeSelector = null;
            drawState(sm, ctx, canvas);
        }
    }
};

// view state
sm.states.view = {
    start: function(sm){
        sm.selectors = [];
        sm.activeSelector = null;
        drawState(sm, ctx, canvas);
    },
    draw: function(sm, ctx, canvas){
        draw.background(ctx, canvas, sm.background);
        drawCurrentTabIndex();
    },
    events: {
        pointerdown : function(sm, pos, e){},
        pointermove : function(sm, pos, e){},
        pointerup : function(sm, pos, e){
            setState(sm, 'editProject');
        }
    }
};

// attach on key up event hander for text area
document.querySelector('#input-json').addEventListener('keyup', function(e){
    jsonToTabIndex(sm, sm.currentTabIndex);
    renderTabSelection()
    createObjectSelectors(sm);
    drawState(sm, ctx, canvas);
});

// create pointer events helper
var createPointerEventHander = function(eventKey){
    return function(e){
        var events = sm.stateObj.events,
        pos = utils.getCanvasRelative(e);
        if(e.type === 'pointerdown'){
            sm.userDown = true;
            sm.sx = pos.x;
            sm.sy = pos.y;
            sm.moveDist = 0;
        }
        if(e.type === 'pointermove'){
            sm.tx = pos.x;
            sm.ty = pos.y;
            sm.moveDist = utils.distance(sm.sx, sm.sy, sm.tx, sm.ty);
        }
        if(e.type === 'pointerup'){
            sm.userDown = false;
        }
        if(events){
            if(events[eventKey]){
                events[eventKey](sm, pos, e);
            }
        }
    }
};
// pointer events
canvas.addEventListener('pointerdown', createPointerEventHander('pointerdown') );
canvas.addEventListener('pointerup', createPointerEventHander('pointerup') );
canvas.addEventListener('pointermove', createPointerEventHander('pointermove') );

// load a background image
var bgImageInput = document.getElementById('input-background-image'); 
bgImageInput.addEventListener('change', function(e){
   var files = e.target.files,
   file = files[0];
   var reader = new FileReader();
   reader.addEventListener('load', function () {
      var img = sm.background.image = new Image();
      img.src = reader.result;
      img.addEventListener('load', function(){
          setState(sm, sm.currentState);
      });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
});

// start init state
setState(sm, 'init');
