let http = require('http'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);

// create server
let server = http.createServer();

// set port with argument or hard coded default
let port = process.argv[2] || 8080; // port 8080 for now

// the root folder to serve
let root = process.argv[3] || path.join(__dirname, 'public');

// For HTTP method
let METHODS = {};

/********* POST *********/

METHODS.POST = function (req, res) {
    let body = '';
    req.on('data', function (chunk) {
        body += chunk.toString();
        // do some basic sanitation
        if (body.length >= 200) {
            // if body char length is greater than
            // or equal to 200 destroy the connection
            res.connection.destroy();
        }
    });
    // once the body is received
    req.on('end', function () {
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        if (body) {
            let bodyObj = JSON.parse(body);
            let obj = {
                body: bodyObj
            };
            if (bodyObj.action === 'add') {
                obj.result = bodyObj.a + bodyObj.b;
            }
            res.write(JSON.stringify(obj), 'utf8');

        } else {
            res.write('{}', 'utf8');
        }
        res.end();
    });
};

/********* GET *********/

// create path info object
let createPathInfoObject = (url) => {
    // remove any extra / ( /foo/bar/  to /foo/bar )
    let urlArr = url.split('');
    if (urlArr[urlArr.length - 1] === '/') {
        urlArr.pop();
        url = urlArr.join('');
    }
    // starting state
    let pInfo = {
        url: url,
        uri: path.join(root, url),
        encoding: 'utf-8',
        mime: 'text/plain',
        ext: '',
        contents: [],
        html: ''
    };
    //return pInfo;
    return lstat(pInfo.uri)
    .then((stat) => {
        pInfo.stat = stat;
        if (pInfo.stat.isFile()) {
            pInfo.ext = path.extname(pInfo.uri).toLowerCase();
            pInfo.ext = path.extname(pInfo.uri).toLowerCase();
            pInfo.mime = pInfo.ext === '.html' ? 'text/html' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.css' ? 'text/css' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.js' ? 'text/javascript' : pInfo.mime;
            // images
            pInfo.mime = pInfo.ext === '.png' ? 'image/png' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.ico' ? 'image/x-icon' : pInfo.mime;
            // binary encoding if...
            pInfo.encoding = pInfo.ext === '.png' || pInfo.ext === '.ico' ? 'binary' : pInfo.encoding;
            return pInfo;
        }
        if (pInfo.stat.isDirectory()) {
            pInfo.ext = '';
            pInfo.mime = 'text/plain';
            pInfo.encoding = 'utf-8';
        }
        return createDirInfo(pInfo);
    });
};

// create an html index of a folder
let createHTML = (pInfo) => {
    var html = '<html><head><title>Index of - ' + pInfo.url + '</title>' +
        '<style>body{padding:20px;background:#afafaf;font-family:arial;}div{display: inline-block;padding:10px;}</style>' +
        '</head><body>';
    html += '<h3>Contents of : ' + pInfo.url + '</h3>'
    pInfo.contents.forEach((itemName) => {
        let itemURL = pInfo.url + '/' + itemName;
        html += '<div> <a href=\"' + itemURL + '\" >' + itemName + '</a> </div>'
    });
    html += '</body></html>';
    return html;
};

// create dir info for a pInfo object
let createDirInfo = (pInfo) => {
    // first check for an index.html
    let uriIndex = path.join(pInfo.uri, 'index.html');
    return readFile(uriIndex)
    // if all goes file we have an indrex file call createPathInfoObject with new uri
    .then((file) => {
        pInfo.uri = uriIndex;
        pInfo.ext = '.html';
        pInfo.mime = 'text/html';
        return pInfo;
    })
    // else we do not get contents
    .catch(() => {
        return readdir(pInfo.uri);
    }).then((contents) => {
        if (contents && pInfo.ext === '') {
            pInfo.contents = contents;
            pInfo.mime = 'text/html';
            pInfo.html = createHTML(pInfo);
        }
        return pInfo;
    });
};

METHODS.GET = function (req, res) {
    // create path info object for req.url
    createPathInfoObject(req.url)
    // if we have a pinfo object without any problems
    .then((pInfo) => {
        // send content
        res.writeHead(200, {
            'Content-Type': pInfo.mime
        });
        // if we have html send that
        if (pInfo.html != '') {
            res.write(pInfo.html, pInfo.encoding);
            res.end();
        } else {
            // else we are sending a file
            readFile(pInfo.uri, pInfo.encoding).then((file) => {
                res.write(file, pInfo.encoding);
                res.end();
            }).catch((e) => {
                // send content
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(e.message, 'utf8');
                res.end();
            });
        }
    }).catch((e) => {
        // send content
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message, 'utf8');
        res.end();
    });
};

/********* ON REQUEST *********/

// for a request
server.on('request', function (req, res) {
    // if we have a method for the request method such as GET or POST call it
    var method = METHODS[req.method];
    if (method) {
        method(req, res);
    } else {
        // else we can not do anything.
        res.end('not a post');
    }
});

/********* LISTEN *********/

server.listen(port, () => {

    console.log('sever is up on port: ' + port);

});
