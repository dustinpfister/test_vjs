let log = (mess) => {

    // log objects in a different way
    if (typeof mess === 'object' && mess != null) {
        Object.keys(mess).forEach((key) => {
            console.log(key + ' : ', mess[key]);
        });
        return;
    }

    // if we get here just log like this
    console.log(mess)

};
