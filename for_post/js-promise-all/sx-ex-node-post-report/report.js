let util = require('util'),
path = require('path'),
fs = require('fs'),
readFile = util.promisify(fs.readFile),
writeFile = util.promisify(fs.writeFile),
readdir = util.promisify(fs.readdir);

let get_uri_array = (dir_posts) => {
    return readdir(dir_posts)
    .then((files) => {
        return files.filter((fileName) => {
            return fileName.match(/\.md$/) != null;
        });
    })
};

get_uri_array(path.join(__dirname, 'posts'))
.then((files) => {

    console.log(files);

})
