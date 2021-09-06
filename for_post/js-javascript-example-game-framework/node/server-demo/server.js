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
readFile = promisify(fs.readFile);


// for this server-demo script the project folder will need to be root
let root = path.join(__dirname, '../..');

// set port with argument or hard coded default
let port = process.argv[2] || 8080; // port 8888 for now

// create and start the server
let server = http.createServer(function (req, res) {
    // get the path
    let p = path.join(root, req.url);
    // default mime to text/plain
    let mime = 'text/plain';
    // default encoding to utf-8, and get file extension
    let encoding = 'utf-8';
    let ext = path.extname(p).toLowerCase();

    // start promise chain
    lstat(p).catch((e)=>{
        // error getting path uri stats
        res.writeHead(500);
        res.write(JSON.stringify(e));
        res.end();
    }).then((stat)=>{
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
    }).catch((e)=>{
        // error reading file
        res.writeHead(500);
        res.write(JSON.stringify(e));
        res.end();
    }).then((file)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': mime
        });
        res.write(file, encoding);
        res.end();
    });
});
 
// start server
server.listen(port, function () {
    console.log('hosting a public folder at: ');
    console.log('path: ' + root);
    console.log('port: ' + port);
});
