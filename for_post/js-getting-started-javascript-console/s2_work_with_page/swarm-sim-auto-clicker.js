
(function(api){

    // get tap 'a' element
    api.getTab = function(index){
        index = index === undefined ? 0: index;
        return document.querySelectorAll('.nav')[0].children[index].children[0];
    };

    api.getUpgrade = function(index){ 
        var ugl = document.querySelectorAll('tbody')[0].children;
        index = index === undefined ? ugl.length - 2: index;
        return ugl[index];
    };

    api.getMaxButton = function(){
        var buttons = document.querySelectorAll('.btn');
        return buttons[buttons.length - 1];
    };

    var autoClick = false,
    ms = 1000,
    loopID;

    var clickLoop = function(){
        // click meat tab
        api.getTab(0).click();
        // get upgrade
        //api.getUpgrade().click();
        // click max button
        //api.getMaxButton().click();
    };

    api.toggleAutoClick = function(){
        if(autoClick){
           clearInterval(loopID);
        }
        if(!autoClick){
           loopID = setInterval(clickLoop, ms);
        }
        autoClick = !autoClick;
    };

    return api;

}(this['sm'] = {}));