
let getPosition = (frame, maxFrame) => {
    // many expressions involving assignment, and the
    // ternary operator
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 0 : maxFrame;
    frame = frame < 0 ? 0 : frame;
    frame %= maxFrame;

    // division operation inside the native function call is preformed first
    // and then that value is subtracted from 0.5. Then that value is divided over
    // 0.5 and is then finally that value is subtracted from one.
    return 1 - Math.abs(0.5 - frame / maxFrame) / 0.5;

};

let maxFrame = 50;
console.log(getPosition(-25,maxFrame)); // 0
console.log(getPosition(0,maxFrame)); // 0
console.log(getPosition(50,maxFrame)); // 0
console.log(getPosition(25,maxFrame)); // 1
console.log(getPosition(75,maxFrame)); // 1
