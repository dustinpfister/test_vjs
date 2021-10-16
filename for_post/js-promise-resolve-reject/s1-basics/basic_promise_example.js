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

// so I have a method that returns a promise that can resolve
// or reject depending on the outcome of what it does
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

// I can then use the promise example
// and have methods that will fire if the promise resolves
// or rejects
delayTest()
.then((mess) => {
    console.log(mess)
})
.catch((e) => {
    console.log(e);
});
