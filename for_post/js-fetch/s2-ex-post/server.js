let http = require('http'),
server = http.createServer(),
port = process.env.PORT || process.env[2] || 8080;

let METHODS = {};

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
        if (body) {
            res.end('okay thank you for: ' + body);
        } else {
            res.end('thanks for the post request, but it would be nice if it had something');
        }
    });
};

METHODS.GET = function (req, res) {};

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

server.listen(port);
