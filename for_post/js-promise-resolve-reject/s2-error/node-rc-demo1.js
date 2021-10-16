let path = require('path'),
countApp = require(path.join(__dirname, 'node-get-conf.js'));

let uri_conf = countApp.parseURI();
countApp.readConf(uri_conf)
.then((obj) => {
    console.log(obj);
})
.catch((e) => {
    let myCode = e.message.split(':')[0];
    console.log(myCode);

    let newState = countApp.newState();
    console.log(newState);

});
