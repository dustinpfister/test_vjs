var sm = gameFrame.smCreateMain({
    currentState: 'game',
});

gameFrame.smPushState(sm, {
    name: 'game',
    draw: function(sm, layers){
        canvasMod.draw(layers, 'background', 0);
    }
});

sm.loop();

console.log(sm);