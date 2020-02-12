
var wiggleText = (function () {

    var makeCharsArray = function () {};

    return {

        createObject: function (str, fontSize, spacing) {

            fontSize = fontSize || 10;
            spacing = spacing === undefined ? 0 : spacing;

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
