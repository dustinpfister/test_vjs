let arr = ['foo','255','128', 64, null, false, NaN],
unit8 = Uint8Array.from(arr);
console.log(unit8); // [0,255,128,64,0,0,0]