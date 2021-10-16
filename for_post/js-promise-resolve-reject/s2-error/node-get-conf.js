let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);

let HARD_SETTINGS = {
    count: 0,
    delta: 1,
    appName: 'basic-count'
};

// read what should be a conf.json file
let readConf = exports.readConf = (uri_conf) => {
    uri_conf = uri_conf || path.resolve(process.argv[2] || path.join(process.cwd(), 'conf.json'));
    // start out by reading what should be a file, but it might not be
    return readFile(uri_conf, 'utf8')
    // some kind of error happened while reading the file
    .catch((e) => {
        // the given file is not a file but a folder
        if (e.code === 'EISDIR') {
            return Promise.reject(new Error('DIR: Must Not give a folder for a conf.json file'))
        }
        // the given file does not exist
        if (e.code === 'ENOENT') {
            return Promise.reject(new Error('NOTFOUND: looks like the given file is not there'))
        }
        // if some other Error
        return Promise.reject('READERR: Other read error:\n code: ' + e.code + '\n mess: ' + e.message);
    })
    // then all is good and we have text that should be json, but it might not be
    .then((data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            // if there is an error resolve but with hard coded values
            return Promise.reject('JSONERR: Error reading the json file');
        }
    }).
    then((obj) => {
        if (obj.appName === undefined || obj.appName != HARD_SETTINGS.appName) {
            return Promise.reject('JSONOTHER: Parsed some json just fine, but it looks like it is not for this app.')
        }
        // if we make it this far, then we have a resolved promsie for this
        return Promise.resolve(obj);
    });
};
