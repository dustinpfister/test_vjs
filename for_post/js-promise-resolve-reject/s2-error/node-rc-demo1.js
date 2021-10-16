let path = require('path'),
countApp = require(path.join(__dirname, 'node-get-conf.js'));

let uri_conf = countApp.parseURI();
// start method for this demo app on top of the countApp module
let start = (uri) => {
    return countApp.readConf(uri)
    .then((obj) => {
        console.log('we have this object to work with: ');
        console.log(obj);
        console.log('we are good staring, lets continue here...')
        return Promise.resolve(obj);
    })
    .catch((e) => {
        let myCode = e.message.split(':')[0];
        let newState = countApp.newState();
        // in the event of a DIR error I can create a conf.json there
        if (myCode === 'DIR') {
            console.log('myCode error is DIR, updating uri_conf, and reading again...');
            // update uri_conf to this:
            uri_conf = path.join(uri, 'conf.json');
            return countApp.readConf(uri_conf)
            .catch((e) => {
                console.log('error trying to read file at updated uri_conf, trying to write one now...');
                return countApp.writeConf(uri_conf, newState);
            })
            .then(() => {
                return start(uri_conf);
            })
        }
        if (myCode === 'NOTFOUND') {
            console.log('myCode error is NOTFOUND, so trying to write it.');
            return countApp.writeConf(uri, newState)
            .then(() => {
                return start(uri);
            })
        }
        // if we get here still start, just with a new state that will not get saved
        return Promise.resolve(newState);
    });
};
start(uri_conf)
.then((state) => {
    state.count += state.delta;
    console.log('new count: ' + state.count);
    return countApp.writeConf(uri_conf, state)
})
.then(() => {
    console.log('state updated.');
})
.catch((e) => {
    console.warn(e.message);
});
