var sm = {};
// testing out oval
sm.points = canvasMod.createPoints(sm.layers, 'oval', 0, 0, 150, 75, 20)
sm.stack = canvasMod.createLayerStack({
    container: '#canvas-app',
    state: sm
});
canvasMod.draw(sm.stack, 'background', 0, 'red');
canvasMod.draw(sm.stack, 'clear', 1);
canvasMod.draw(sm.stack, 'points', 1, sm.points, 160, 120);
// custom draw method works
canvasMod.draw(sm.stack, 'print', 1, 'hello world', 5, 5, {fillStyle: 'white', fontSize: 20 });
