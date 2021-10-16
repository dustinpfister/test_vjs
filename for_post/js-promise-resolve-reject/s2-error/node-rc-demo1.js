let path = require('path'),
countApp = require(path.join(__dirname, 'node-get-conf.js'));

let uri_conf = countApp.parseURI();

let start = (uri) => {
    return countApp.readConf(uri)
    .then((obj) => {
        console.log('we are good staring, lets continue here...')
        return Promise.resolve(obj);
    })
    .catch((e) => {
        let myCode = e.message.split(':')[0];
        let newState = countApp.newState();
        // in the event of a DIR error I can create a conf.json there
        if (myCode === 'DIR') {
            let newState = countApp.newState();
            console.log('myCode error is DIR, writing new conf.json file there');
            return countApp.writeConf(path.join(uri, 'conf.json'), newState)
            .then(() => {
                return start(path.join(uri, 'conf.json'));
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
