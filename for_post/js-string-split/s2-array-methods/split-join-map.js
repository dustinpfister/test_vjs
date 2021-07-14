var nums = '1,2,3,4'.split(',').map((str)=>{ return Math.pow(2, parseInt(str))}).join('-');
console.log(nums); // 2-4-8-16