(function(api){

    // create main game state
    api.create = function(opt){
       opt = opt || {};
       opt.canvas = opt.canvas || {width: 320, height: 240};
       var game = {
          canvas: opt.canvas,
          down: false,
          gameOver: false,
          spawn: {  // object spawn setings
              rate: opt.spawnRate || 0.25,
              objectsPerSpawn: opt.objectsPerSpawn || 5,
              bombChance: opt.bombChance === undefined ? 0.025 : opt.bombChance,
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
              count: 100,
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
            dir = anglesMod.shortestAngleDirection(disp.heading, a),
            delta = Math.PI / 180 * disp.degreesPS * secs;
            // apply delta to disp.heading
            disp.heading -= delta * dir;
            // move display object
            dispMod.moveDispByPPS(disp, secs);
            // check if disp object has hit guy
            if(utils.boundingBox(game.guy, disp)){
                if(game.down){
                    if(disp.data.type === 'egg'){
                        game.score += 1;
                    }
                    if(disp.data.type === 'bomb'){
                        game.gameOver = true;
                    }
                }
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

    // spawn objects helper
    var spawn = function(game, secs){
        var spawn = game.spawn;
        spawn.secs += secs;
        if(spawn.secs >= spawn.rate){
            var i = spawn.objectsPerSpawn;
            while(i--){
                var disp = dispMod.getFreeDisp(game.pool),
                type = 'egg',
                roll = Math.random();
                if(roll < spawn.bombChance){
                    type = 'bomb';
                }
                if(disp){
                    // core disp values
                    disp.active = true;
                    disp.x = game.canvas.width - 64;
                    disp.y = 96;
                    disp.pps = 128 + 128 * Math.random();
                    disp.degreesPS = 60 + (90 - 60) * Math.random();
                    disp.heading = Math.PI * 1.5 - Math.PI * 1.25 * Math.random();
                    disp.fill = 'white';
                    // game data
                    disp.data.type = type;
                    if(type === 'bomb'){
                        disp.fill = 'black';
                    }
                }
            }
            spawn.secs = utils.mod(spawn.secs, spawn.rate);
        }
    };

    // draw display object
    api.update = function(game, secs){

        if(!game.gameOver){
            // spawn objects
            spawn(game, secs);

            // update pool of objects
            updatePool(game, secs);
        }

    };

}(this['gameMod'] = {}));