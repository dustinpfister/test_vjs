var func = function(a,b){
 
   // the arguments object is structured like an array
   console.log(arguments[0]); // 5
   console.log(arguments.length); // 2
 
   // However the constructor is Object, not Array
   // so it is an "array like object"
   console.log(arguments.constructor.name); // Object
   
   return a + b; // 10
 
};
func(5,5);