let fs = require('fs'),
path = require('path'),

root = path.resolve('./');

// read a root dir for files (using a callback)
fs.readdir(root, function (e, files) {

    if (files) {

        // for each file
        files.forEach(function (file) {
            let dir = path.join(root, file);

            // get stats for a file (another callback)
            fs.stat(dir, function (e, stats) {

                if (stats.isFile() && path.extname(dir).toLowerCase() === '.js') {

                    // read file (yet another callback)
                    fs.readFile(dir, function (err, data) {

                        // finally log javaScript code
                        console.log(data.toString());

                    })

                }

            });

        });
    }

});
