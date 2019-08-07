let func1 = function (angle, distance, offsetX, offsetY) {
    angle = angle === undefined ? 0 : angle;
    distance = distance === undefined ? 0 : distance;
    offsetX = offsetX === undefined ? 0 : offsetX;
    offsetY = offsetY === undefined ? 0 : offsetY;
    let point = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };

    // if two or more arguments are given
    if (arguments.length >= 2) {
        point.x = point.x * distance + offsetX;
        point.y = point.y * distance + offsetY;
    }

    return point;
};

console.log(func1(Math.PI / 2, 10, 5, 5));
// { x: 5.000000000000001, y: 15 }

console.log(func1(Math.PI / 2));
// { x: 6.123233995736766e-17, y: 1 }
