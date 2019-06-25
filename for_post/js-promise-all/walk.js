
let util = require('util'),
fs = require('fs');

util.promisify(fs.readdir)('./')

.then((files)=>{
	
	console.log(files);
	
});