
var tw = (function () {

    var makeCharsArray = function () {};

    return {

        createWiggleTextObject: function (str, fontSize) {

            fontSize = fontSize || 10;

            return {
                chars: str.split('').map(function (ch, i) {
                    return {
                        x: i * (fontSize + spacing),
                        y: 0,
                        ch: ch
                    };
                })
            };

        }

    };

}
    ());
