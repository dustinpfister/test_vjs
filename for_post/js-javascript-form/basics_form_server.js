
let http = require('http'),
path = require('path'),
fs = require('fs'),
url = require('url'),
port = process.env.port || process.argv[2] || 8080;

let server = http.createServer();

let getHandler = function (req, res) {

    return new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            if (req.url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream(path.join(__dirname, 'basics_form.html')).pipe(res, function () {
                    resolve();
                });
            } else {

                let qs = url.parse(req.url, true).query;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write('query for: ' + qs.fn);
                resolve();
            }
        } else {
            reject(new Error('not a get request'));
        }
    });

};

server.on('request', function (req, res) {

    getHandler(req, res)
    .catch((e) => {
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message);
        res.end();
    })
    .then(() => {
        res.end();
    });

});

server.listen(port, () => {

    console.log('web server is up on port: ' + port);

});
