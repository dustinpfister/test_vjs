# js-function-many-to-one

A many to one function would appear to be a term that refers to there being more than one independent variable that will result in the same dependent variable returned by the function. For example take into account a function that will take one argument d, that is a value in degrees, and the returned result is a call of the built in Math.sin function where the argument passed is a radian value of the given degree value. If I give this function the value 90 the returned value is 1, if I give this function an argument value of 450 the return value is again 1.

```js
var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the independent variable d
// will result in the same dependent value being returned
console.log( dSin(90) );  // 1
console.log( dSin(450) ); // 1
```

So then if the d argument is thought of as x, and the return value is thought of as y, then it is not possible to create an inverse function of this kind of function. The reason why is because for any given y value there would be more than one possible value for x when it comes to the idea of tying to make an inverse function for something like this.

## Some resources

Another term for this kind of function might be a surjective function

```
https://en.wikipedia.org/wiki/Surjective_function
```