var array = [4,5,6];

array[array.length] = 7;
array = [3].concat(array);

console.log(array.join('-')); // 3-4-5-6-7