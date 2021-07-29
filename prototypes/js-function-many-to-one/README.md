# js-function-many-to-one

A many to one function would appear to be a term that referes to there being more than one independant variable that will result in the same depednat value returned by the function. For example take the built in Math.sin function into account.

```js
var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the indepandant variable d
// will result in the same depedant value being retruned
console.log( dSin(90) );
console.log( dSin(450) );
```


