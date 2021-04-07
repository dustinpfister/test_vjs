
var sm = {
   money: 100,
   trade : tradeMod.create()
};

// create a simple plain text view
var plainText = function(sm){
    var text = '';
    text += 'money: ' + sm.money + '\n\n';
    Object.keys(sm.trade.items).forEach(function(itemKey){
        var item = sm.trade.items[itemKey];
        text += item.desc + ' : ' + item.current + '\n';
    });
    return text;
};

tradeMod.buy(sm.trade, 'apple', 5, sm);

console.log( plainText(sm) );
