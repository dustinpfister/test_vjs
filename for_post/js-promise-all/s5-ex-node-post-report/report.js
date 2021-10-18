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

// read all files returning an array of objects with fileName, and md for each post
// like this: [{fileName: foo.md, md: 'markdown text of foo.md'}]
let readAll = (dir_posts) => {
    fileNames = [];
    return get_uri_array(dir_posts)
    .then((files) => {
        fileNames = files;
        let array = files.map((fileName) => {
                return readFile(path.join(dir_posts, fileName), 'utf8')
                .then((md) => {
                    return {
                        fileName: fileName,
                        md: md
                    };
                });
            });
        return Promise.all(array);
    });
};

// set dates for the array of post objects
// deleting any md key for each object in any case
let setDates = (postObjects) => {
    let patt = /---[\s|\S]*?---/g;
    return postObjects.map((postObj) => {
        let m = postObj.md.match(patt);
        if (m) {
            m[0].split('\r\n').forEach((str) => {
                if (str.match(/^date/)) {
                    postObj.date = str.replace(/^date:/, '').trim();
                }
                if (str.match(/^updated/)) {
                    postObj.updated = str.replace(/^updated:/, '').trim();
                }
            });
        }
        // delete md
        delete postObj.md;
        return postObj;
    })
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
    .then((objects) => {
        var posts = setDates(objects);
        report.posts = posts;
        return writeFile(uri_json, JSON.stringify(report), 'utf8');
    })
};

module.exports = api;