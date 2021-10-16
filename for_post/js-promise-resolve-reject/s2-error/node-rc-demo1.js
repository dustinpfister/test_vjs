let path = require('path'),
countApp = require(path.join(__dirname, 'node-get-conf.js'));

let uri_conf = countApp.parseURI();

let start = (uri) => {
    return countApp.readConf(uri)
    .then((obj) => {
        console.log('we are good')
        console.log(obj);
    })
    .catch((e) => {
        let myCode = e.message.split(':')[0];
        console.log(myCode);
        // in the event of a DIR error I can create a conf.json there
        if (myCode === 'DIR') {
            let newState = countApp.newState();
            console.log('myCode error is DIR, writing new conf.json file there');
            return countApp.writeConf(path.join(uri, 'conf.json'), newState)
            .then(() => {
                return start(path.join(uri_conf, 'conf.json'));
            })
        }
		
		
    });
};
start(uri_conf);
