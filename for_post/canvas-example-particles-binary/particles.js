
var paricles(function () {

    var createPartcile = function () {

        return {
            x: -1,
            y: -1,
            heading: 0,
            bits: '00', // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
            pps: 32, // pixels per second
            life: 3000 // life left in milliseconds when in explode mode
        };

    };

    return {

        create: function () {},

        update: function () {}

    }

}
    ());
