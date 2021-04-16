(function(api){

    // draw background
    api.create = function(opt){
       opt = opt || {};
       opt.canvas = opt.canvas || {width: 320, height: 240};
       var game = {
          canvas: opt.canvas,
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

    // update the pool
    var updatePool = function(game, secs){
        game.pool.disp.forEach(function(disp){

            // ajust heading
            var a =  anglesMod.getAngleToPoint(game.guy, disp),
            dir = anglesMod.shortestAngleDirection(disp.heading, a);

            if(dir === 1){
                disp.heading -= Math.PI / 180 * 5;
            }
            if(dir === -1){
                disp.heading += Math.PI / 180 * 5;
            }

            //disp.heading = Math.atan2(game.guy.cy - disp.cy, game.guy.cx - disp.cx);

            // move display object
            dispMod.moveDispByPPS(disp, secs);
            // check if disp object has hit guy
            if(utils.boundingBox(game.guy, disp)){
                disp.active = false;
            }
            // out of bounds?
            if(disp.y >= canvas.height + disp.h){
                disp.active = false;
            }
            if(disp.x < 0 - disp.w){
                disp.active = false;
            }
        });
    };


    // draw display object
    api.update = function(game, secs){

        // spawn pool disps
        var disp = dispMod.getFreeDisp(game.pool);
        if(disp){
            disp.active = true;
            disp.x = game.canvas.width- 64;
            disp.y = 64;
            disp.heading = Math.PI * 1.5;
        }

        // update pool
        updatePool(game, secs);

    };

}(this['gameMod'] = {}));