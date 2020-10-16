console.log( [].concat.apply({length:3},['foo','man','chew']) );
console.log( [].concat.call({length:3},'foo','man','chew') );
 
// both produce ['foo','man','chew'];