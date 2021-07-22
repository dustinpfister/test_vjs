# js-function-inverse

The idea here is to just write a whole bunch of functions that can be inverted. That is having a function where I pass at least one known value and get a product, then being able to pass that product to another function that returns the argument that I gave to the first. Another term that might be used to describe these kinds of functions are two way functions. A very simple hello world example of this kind of function might be something like this:

```
// have x, return y
var func1 = function(x){
    return 5 * x - 7;
};
// have y, return x
var func2 = function(y){
   return ( y + 7 ) / 5;
};
```

```
https://en.wikipedia.org/wiki/Inverse_function
```