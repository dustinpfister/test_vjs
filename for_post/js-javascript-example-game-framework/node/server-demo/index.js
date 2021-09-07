/*
 *  index.js
 *
 *   start server to host the root of this project folder
 *
 *   ex: $ node index.js
 *
 */

let spawn = require('child_process').spawn,
path = require('path'),

uri_root = path.join(__dirname, '../../'),
uri_server = path.join(__dirname, 'server.js')

console.log(uri_server);

let ls = spawn('node', [uri_server, '8080']);

ls.stdout.on('data', function(data){
    console.log(data.toString());
});

ls.stderr.on('data', function(data){
    console.log(data.toString());
});

ls.on('exit', function (code) {
  console.log('Child process exited with exit code ' + code);
});
