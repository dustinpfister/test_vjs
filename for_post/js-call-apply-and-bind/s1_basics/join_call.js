var arr = {0:'foo',1:'man',2:'chew',3:'is',4:'always',5:'in',6:'style',length:7},
mess = [].join.call(arr,' ');
console.log(mess); // foo man chew is always in style
