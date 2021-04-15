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

            // ajust heading
            disp.heading = Math.atan2(game.guy.cy - disp.cy, game.guy.cx - disp.cx);

            disp.x += Math.cos(disp.heading) * disp.pps * secs;
            disp.y += Math.sin(disp.heading) * disp.pps * secs;
            disp.cx = disp.x + disp.hw;
            disp.cy = disp.y + disp.hh;
            if(disp.y >= canvas.height - 64){
                disp.active = false;
            }
        });

    };

}(this['gameMod'] = {}));