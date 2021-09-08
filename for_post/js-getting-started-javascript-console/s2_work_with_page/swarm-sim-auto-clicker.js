
(function(api){

    // get tap 'a' element
    api.getTab = function(index){
        index = index === undefined ? 0: index;
        return document.querySelectorAll('.nav')[0].children[index].children[0];
    };

    // get an upgrade 'a' element to click
    api.getUpgrade = function(index){ 
        var ugl = document.querySelectorAll('tbody')[0].children;
        index = index === undefined || index < 0 ? ugl.length - 2: index;
        return ugl[index].children[1];
    };

    // get the max button to click
    api.getMaxButton = function(){
        var buttons = document.querySelectorAll('.btn-group')[0].children;
        //var buttons = document.querySelectorAll('.btn');
        return buttons[buttons.length - 1];
    };

    var autoClick = false,
    ms = 10000,
    upgradeIndex = -1, // -1 can be used to choose highest upgrade
    loopID;

    var clickLoop = function(){
        // click meat tab
        api.getTab(0).click();
        // get upgrade
        api.getUpgrade(upgradeIndex).click();
        // click max button
        api.getMaxButton().click();
        // mess
        console.log('auto click ( ms: ' + ms + '; ui: ' + upgradeIndex + ' )');
    };

    api.toggleAutoClick = function(set_ui, set_ms){
        ms = set_ms === undefined ? 10000 : set_ms;
        upgradeIndex = set_ui === undefined ? -1 : set_ui;
        if(autoClick){
           clearInterval(loopID);
        }
        if(!autoClick){
           loopID = setInterval(clickLoop, ms);
        }
        autoClick = !autoClick;
        console.log('auto click is ' + (autoClick ? 'on' : 'off') );
    };

    return api;

}(this['sm'] = {}));