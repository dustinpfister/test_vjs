(function(api){

    // create main game state
    api.create = function(opt){
       opt = opt || {};
       opt.canvas = opt.canvas || {width: 320, height: 240};
       var game = {
          canvas: opt.canvas,
          spawn: {  // object spawn setings
              rate: opt.spawnRate || 1,
              objectsPerSpawn: opt.objectsPerSpawn || 3,
              bombChance: opt.bombChance === undefined ? 0.05 : opt.bombChance,
              secs: 0
          },
          guy : dispMod.createDisp({
              x: 32,
              w: 96,
              h: 96,
              fill: 'blue',
              y: canvas.height - 96 - 32
          }),
          pool: dispMod.createPool({
              count: 30,
              dispOptions: {}
          })
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

    var spawn = function(game, secs){
        // spawn
        var spawn = game.spawn;
        spawn.secs += secs;
        if(spawn.secs >= spawn.rate){
            var i = spawn.objectsPerSpawn;
            while(i--){
                var disp = dispMod.getFreeDisp(game.pool),
                objType = 'egg',
                roll = Math.random();
                if(roll < spawn.bombChance){
                    objType = 'bomb';
                }
                if(disp){
                    // core disp values
                    disp.active = true;
                    disp.x = game.canvas.width - 64;
                    disp.y = 64;
                    disp.pps = 128 + 128 * Math.random();
                    disp.heading = Math.PI * 1.5 - Math.PI * Math.random();
                    // game data
                    disp.data.type = objType;
                }
            }
            spawn.secs = utils.mod(spawn.secs, spawn.rate);
        }
    };

    // draw display object
    api.update = function(game, secs){

        spawn(game, secs);

        // update pool
        updatePool(game, secs);

    };

}(this['gameMod'] = {}));