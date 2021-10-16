let path = require('path'),
readConf = require(path.join(__dirname, 'node-get-conf.js')).readConf;

let uri_conf = path.resolve(process.argv[2] || path.join(process.cwd(), 'conf.json'));
readConf(uri_conf)
.then((obj) => {

    console.log(obj);

})
.catch((e) => {

    console.log(e.message);

});
