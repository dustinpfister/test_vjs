
var sm = {};

sm.getTab = function(index){
    index = index === undefined ? 0: index;
    return document.querySelectorAll('.tab-resource')[index];
};

sm.getUpgrade = function(index){ 
    var ugl = document.querySelectorAll('tbody')[0].children;
    index = index === undefined ? ugl.length - 2: index;
    return ugl[index];
};

sm.getMaxButton = function(){
    var buttons = document.querySelectorAll('.btn');
    return buttons[buttons.length - 1];
};