var i = 0,
iStep = 0.5,
len = 6;

while(i < len){
   var x = -2 + i;
   var a = Math.pow(2, x),
   b = Math.pow(2, x * 0.25),
   c = Math.pow(2, x) * 0.25;
   console.log(x, a);
   i += iStep;

}