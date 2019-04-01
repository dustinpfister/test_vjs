let fs = require('fs'),
path = require('path');

let root = path.resolve('./');

fs.readdir(root, function (e, files) {

    if (files) {
        files.forEach(function (file) {
            let dir = path.join(root, file);
            console.log(dir);
        });
    }

});
