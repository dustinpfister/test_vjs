var a = [1, 2, 4, 5];
a.splice(1, 2, 'c', 'd');
console.log(a); // [ 1, 'c', 'd', 5 ]

// having an array as an element to inject will result in 
// the array being injected as an element
a.splice(2, 1, ['e, f, g'] );
console.log(a);
// [ 1, 'c', [ 'e, f, g' ], 5 ]

// The function apply method and array concat method can be used
// to inject an array of elements as single elements in the array
[].splice.apply(a, [2, 1].concat(['e', 'f', 'g']));
console.log(a);
// [ 1, 'c', 'e', 'f', 'g', 5 ]