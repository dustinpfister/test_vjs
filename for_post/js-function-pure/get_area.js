var getArea = function (bx) {
    if (typeof bx != 'object' || bx === null) {
        return null;
    }
    if (bx.w === undefined || bx.h === undefined) {
        return 0;
    }
    return bx.w * bx.h;
};

console.log( getArea ({w: 10, h: 5}) ); // 50
