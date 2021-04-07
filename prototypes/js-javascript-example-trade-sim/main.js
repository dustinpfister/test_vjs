
var sm = {
   money: 100,
   trade : tradeMod.create()
};

var draw = function(sm){

    var text = '';
    Object.keys(sm.trade.items).forEach(function(itemKey){
        var item = sm.trade.items[itemKey];
        text += item.desc + ' : ' + item.current + '\n';
    });
    return text;
};

console.log( draw(sm) );
