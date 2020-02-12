
var wiggleText = (function () {

    var makeCharsArray = function (str, fontSize, spacing) {
        return str.split('').map(function (ch, i) {
            return {
                x: i * (fontSize + spacing),
                y: 0,
                ch: ch
            };
        });
    };

    return {

        createObject: function (str, fontSize, spacing) {

            fontSize = fontSize || 10;
            spacing = spacing === undefined ? 0 : spacing;

            return {
                chars: makeCharsArray(str, fontSize, spacing)
            };

        }

    };

}
    ());
