(function(api){

    // draw background
    api.create = function(opt){
       opt = opt || {};
       opt.canvas = opt.canvas || {width: 320, height: 240};
       var game = {
          guy : dispMod.createDisp({
              x: 32,
              w: 96,
              h: 96,
              fill: 'blue',
              y: canvas.height - 96 - 32
          }),
          pool: dispMod.createPool({count: 15})
       };
       return game;
    };

    // draw display object
    api.update = function(game, secs){

        game.pool.disp.forEach(function(disp){
            disp.x += Math.cos(disp.heading) * disp.pps * secs;
            disp.y += Math.sin(disp.heading) * disp.pps * secs;
            if(disp.y >= canvas.height - 64){
                disp.active = false;
            }
        });

    };

}(this['gameMod'] = {}));