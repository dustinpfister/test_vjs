let util = require('util'),
path = require('path'),
fs = require('fs'),
readFile = util.promisify(fs.readFile),
writeFile = util.promisify(fs.writeFile),
readdir = util.promisify(fs.readdir);

// just get a filtered list of posts for the given dir
let get_uri_array = (dir_posts) => {
    return readdir(dir_posts)
    .then((files) => {
        return files.filter((fileName) => {
            return fileName.match(/\.md$/) != null;
        });
    })
};

// read all files returning an array of markdown text
let readAll = (dir_posts) => {
    return get_uri_array(dir_posts)
    .then((files) => {
        return Promise.all(files.map((fileName) => {
                return readFile(path.join(dir_posts, fileName), 'utf8');
            }));
    });
};

// export
let api = (dir_posts, uri_json) => {
    return readAll(dir_posts);
};

module.exports = api;
