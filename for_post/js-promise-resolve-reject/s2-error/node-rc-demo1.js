let path = require('path'),
countApp = require(path.join(__dirname, 'node-get-conf.js'));

let uri_conf = countApp.parseURI();
countApp.readConf(uri_conf)
.then((obj) => {

    console.log(obj);

})
.catch((e) => {

    console.log(e.message);

});
