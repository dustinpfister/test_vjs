let str= '1234-test-4321';
 
console.log(str[5]); // 't'
console.log(str.charAt(5)); // 't'
 
str = str.slice(0,5) + 'b' + str.slice(6,str.length-1)
 
console.log(str);