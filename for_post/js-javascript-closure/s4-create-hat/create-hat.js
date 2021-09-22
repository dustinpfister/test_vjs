var createHat = function (sample) {
    sample = sample || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var inHat;
    var api = {
        pull: function () {
            if (inHat.length > 0) {
                var index = Math.floor(Math.random() * inHat.length);
                var result = inHat.splice(index, 1);
                return result[0];
            }
            // nothing in the hat
            return false;
        },
        start: function () {
            return inHat = sample.map(function (n) {
                    return n;
                });
        }
    };
    api.start();
    return api;
};

var hat = createHat();
var i = 0;
while (i < 15) {
    var n = hat.pull();
    if (n === false) {
        hat.start();
        n = hat.pull();
        console.log('');
        console.log('new hat');
        console.log(n)
    } else {
        console.log(n);
    }
    i += 1;
}
