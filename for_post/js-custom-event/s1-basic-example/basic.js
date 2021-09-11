var myEvent = new CustomEvent(
        'my-event', {
        detail: {
            message: 'custom event!',
            time: new Date(),
            n: 42
        },

        bubbles: true,
        cancelable: true
    });

// define a handler for the event
document.body.addEventListener('my-event', function (e) {
    console.log(e.detail.message); // 'custom event!'
    console.log(e.detail.n); // 42

});

// dispatch it
document.body.dispatchEvent(myEvent)
