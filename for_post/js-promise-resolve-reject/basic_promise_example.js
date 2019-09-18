let defaultTest = () => {
    let i = Math.pow(10, 8),
    st = new Date(),
    t,
    n = 0;
    while (i--) {
        n += 5;
    }
    t = new Date() - st;
    if (t < 250) {
        return true;
    }
    return false;
}

let delayTest = (delay, theTest) => {
    delay = delay === undefined ? 1000 : delay;
    theTest = theTest === undefined ? defaultTest : theTest;
    return new Promise((resolve, reject) => {

        if (theTest()) {
            resolve('the test passed');
        }
        reject('the test failed');

    });
};

delayTest()
.then((mess) => {

    console.log(mess)

})
.catch((e) => {

    console.log(e);

})
