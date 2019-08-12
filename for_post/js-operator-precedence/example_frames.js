
let getPosition = (frame, maxFrame) => {
    // many expressions involving assignment, and the
    // ternary operator
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 0 : maxFrame;
    frame = frame < 0 ? 0 : maxFrame;
    frame %= maxFrame;

    // division operation inside the native function call
    return 1 - Math.abs(0.5 - frame / maxFrame) / 0.5;

};
