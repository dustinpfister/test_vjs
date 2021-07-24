# ratio.js client

This is a module that has a few methods that help with ratios in the from of an array of numbers. This is then a core support library of my orb.js module. The main method of interest here might be the get simple ratio method that is the method that is used to get a simple ratio array from an array of points in the orb module.

## ratio.GCD - function (a, b)

This is a Greatest Common Divisor method that will help to find the highest number to divide a number by.

## ratio.GCDFromArray - function(arr, n)

 Greatest Common Divisor from array

## ratio.allNonZeroEqual - function (array)

Are all non-zero elements in the ratio equal to each other? This is a good first step when it comes to the process of fining out what type of orb I am now dealing with when it comes to working out such methods in the orb.js module.

```js
ratio.allNonZeroEqual([1,0,1,1]); // true
ratio.allNonZeroEqual([1,2,0,4]); // false
```

## ratio.countNonZero = function(array)

count nonZero array elements

## ratio.isBinaryArray = function(array)

Is the array a binary only array, composed of numbers 0 and 1 only?

## ratio.getSimpleRatio = function (arr)

get the simple ratio from a set of arr (or simplify a ratio)

```js
ratio.getSimpleRatio([0,0,14,2]); // [0,0,7,1]
```
## ratio.getRaisedRatio = function(arr, n, base)

raise the given array of numbers n time with the given base
The array of numbers will be simplified

```js
ratio.getRaisedRatio([2,2,0,1], 2, 1); // [4,4,0,2]
ratio.getRaisedRatio([2,2,0,1], 4, 2); // [32,32,0,16]
```

## ratio.getLevel = function(arr, base)

What should be the inverse of ratio.getRaisedRatio

```js
ratio.getLevel([4,4,0,2], 1); // 2
ratio.getLevel([32,32,0,16], 2); // 4
```


## ratio.sum = function(arr)

just the sum of the numbers
