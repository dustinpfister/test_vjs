var closure = function (a) {
    return function (d) {
        return {
            x: Math.cos(a) * d,
            y: Math.sin(a) * d
        }
    };
};
