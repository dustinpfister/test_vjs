let createOnce = () => {
    var count = 0;
    return function (mess) {
        if (count === 0) {
            console.log(mess);
            count += 1;
        }
    };
};

var once = createOnce();

var i = 10;
while (i--) {
    once(i); // 9
}
