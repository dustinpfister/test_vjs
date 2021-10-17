let util = require('util'),
path = require('path'),
fs = require('fs'),
readFile = util.promisify(fs.readFile),
writeFile = util.promisify(fs.writeFile),
readdir = util.promisify(fs.readdir);

let NEW_REPORT = {
    posts: []
};

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

// try to get the given json file and if not found
// write a new one, in any case return an object that
// is the parsed json, or a default object used for a new report
let getReport = function (uri_json) {
    return readFile(uri_json, 'utf8')
    .catch((e) => {
        let json = JSON.stringify(NEW_REPORT);
        console.log('report not found writing new one');
        return writeFile(uri_json, json, 'utf8')
        .then(() => {
            return Promise.resolve(json);
        })
    })
    .then((json) => {
        return JSON.parse(json);
    });
};

// export
let api = (dir_posts, uri_json) => {
    let report = {};
    return getReport(uri_json)
    .then((loadedReport) => {
        report = loadedReport;
        return readAll(dir_posts);
    })
	.then(()=>{
		
		
	})
};

module.exports = api;
