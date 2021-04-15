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
              y: canvas.height - 96 - 32
          })
       };

    };

    // draw display object
    api.update = function(game, secs){
    };

}(this['game'] = {}));