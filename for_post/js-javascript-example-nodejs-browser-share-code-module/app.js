let path = require('path');
utils = require( path.join(__dirname, 'lib/utils.js' ));

console.log( Math.floor(utils.distance(0,0,45,45)) ); // 63