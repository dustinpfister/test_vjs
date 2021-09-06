/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 *   ex: $ node server ./ 8080
 *
 */

let http = require('http'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);


// for this server-demo script the project folder will need to be root
let root = path.join(__dirname, '../..');

// set port with argument or hard coded default
let port = process.argv[2] || 8080; // port 8888 for now

let createDirInfo = (pInfo) => {
    // first check for an index.html
    let uriIndex = path.join( pInfo.uri, 'index.html' );
    return readFile(uriIndex)
    // if all goes file we have an indrex file call createPathInfoObject with new uri
    .then((file)=>{
        pInfo.uri = uriIndex;
        pInfo.ext = '.html';
        pInfo.mime = 'text/html';
        return pInfo;
    })
    // else we do not get contents
    .catch(()=>{
        return readdir(pInfo.uri);
    }).then((contents)=>{
        if(contents){
            pInfo.contents = contents;
            pInfo.html = '<html><head><title>Index of - ' + pInfo.url + '</title></head><body>';
            pInfo.mime = 'text/html';
            pInfo.contents.forEach((itemName)=>{
                let itemURL = pInfo.url + '/' + itemName;
                pInfo.html += '<a href=\"' + itemURL + '\" >' +  itemName + '</a><br>'
            });
            pInfo.html += '</body></html>';
        }
        return pInfo;
    });
};

// create path info object
let createPathInfoObject = (url) => {

    let urlArr = url.split('');
    if(urlArr[urlArr.length - 1] === '/'){
        urlArr.pop();
        url = urlArr.join('');
    }  

    // starting state
    let pInfo = {
        url : url,
        uri : path.join(root, url),
        encoding: 'utf-8',
        mime: 'text/plain',
        ext: '',
        contents: [],
        html: ''
    };
    //return pInfo;
    return lstat(pInfo.uri)
    .then((stat)=>{
        pInfo.stat = stat;
        if(pInfo.stat.isFile()){
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
        if(pInfo.stat.isDirectory()){
            pInfo.ext = '';
            pInfo.mime = 'text/plain';
            pInfo.encoding = 'utf-8';
        }
        return createDirInfo(pInfo);
    });

};


// create and start the server
let server = http.createServer(function (req, res) {
    // get the path
    //let p = path.join(root, req.url);
    // default mime to text/plain
    //let mime = 'text/plain';
    // default encoding to utf-8, and get file extension
    //let encoding = 'utf-8';
    //let ext = path.extname(p).toLowerCase();


    createPathInfoObject(req.url).then((pInfo)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': pInfo.mime
        });
        // if we have html send that
        if(pInfo.html != ''){
            res.write(pInfo.html, pInfo.encoding);
            res.end();
        }else{
            // else we are sending a file
            readFile(pInfo.uri, pInfo.encoding).then((file)=>{
                console.log(pInfo);
                res.write(file, pInfo.encoding);
                res.end();
            }).catch((e)=>{
                // send content
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(e.message, 'utf8');
                res.end();
            });
        }
    }).catch((e)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message, 'utf8');
        res.end();
    });

/*
    // start promise chain
    lstat(p).then((stat)=>{
        // if it is not a file append index.html to path, and try that
        if (!stat.isFile()) {
            p = path.join(p, 'index.html');
        }
        // text
        mime = ext === '.html' ? 'text/html' : mime;
        mime = ext === '.css' ? 'text/css' : mime;
        mime = ext === '.js' ? 'text/javascript' : mime;
        // images
        mime = ext === '.png' ? 'image/png' : mime;
        // binary encoding if...
        encoding = ext === '.png' ? 'binary' : encoding;
        return readFile(p, encoding);
    }).then((file)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': mime
        });
        res.write(file, encoding);
        res.end();
    }).catch((e)=>{
        // error reading file
        res.writeHead(500);
        res.write(JSON.stringify(e));
        res.end();
    });
*/

});

/*
// create and start the server
let server = http.createServer(function (req, res) {
    // get the path
    let p = path.join(root, req.url);
    // default mime to text/plain
    let mime = 'text/plain';
    // default encoding to utf-8, and get file extension
    let encoding = 'utf-8';
    let ext = path.extname(p).toLowerCase();


    createPathInfoObject(req.url).then((pInfo)=>{
        console.log(pInfo);
    }).catch((e)=>{
        console.log(e);
    });

    // start promise chain
    lstat(p).then((stat)=>{
        // if it is not a file append index.html to path, and try that
        if (!stat.isFile()) {
            p = path.join(p, 'index.html');
        }
        // text
        mime = ext === '.html' ? 'text/html' : mime;
        mime = ext === '.css' ? 'text/css' : mime;
        mime = ext === '.js' ? 'text/javascript' : mime;
        // images
        mime = ext === '.png' ? 'image/png' : mime;
        // binary encoding if...
        encoding = ext === '.png' ? 'binary' : encoding;
        return readFile(p, encoding);
    }).then((file)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': mime
        });
        res.write(file, encoding);
        res.end();
    }).catch((e)=>{
        // error reading file
        res.writeHead(500);
        res.write(JSON.stringify(e));
        res.end();
    });
});
*/
 
// start server
server.listen(port, function () {
    console.log('hosting a public folder at: ');
    console.log('path: ' + root);
    console.log('port: ' + port);
});
