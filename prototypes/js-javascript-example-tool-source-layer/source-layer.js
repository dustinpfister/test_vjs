var sourceLayer = (function(){

    var resolveElRef = function(elRef){
        if(typeof elRef === 'object' && elRef != null){
            return elRef
        }
        if(typeof elRef === 'string'){
            return document.querySelector(elRef);
        }
        return null
    };

    var api = {};

    api.create = function(opt){
        opt = opt || {};
        var source = {
            canvas: null,
            ctx: null,
            zoom: 1,
            radian: 0,
            image: null,
            sx: 0, sy: 0, sw: 32, sh: 32, sx: 0, dx: 0, dw: 32, dh: 32
        };
        source.canvas = resolveElRef(opt.canvas)
/*
        if(opt.canvas){
            if(typeof opt.canvas === 'object' && opt.canvas != null){
                source.canvas = opt.canvas;
            }
            if(typeof opt.canvas === 'string'){
                source.canvas = document.querySelector(opt.canvas);
            }
        }
*/
        if(source.canvas){
            source.ctx = source.canvas.getContext('2d');
        }
        return source;

    };

    api.appendImageHandler = function(source, fileEl){



bgImageInput.addEventListener('change', function(e){
   var files = e.target.files,
   file = files[0];
   var reader = new FileReader();
   reader.addEventListener('load', function () {

      var img = sm.background.image = new Image();
      img.src = reader.result;
      img.addEventListener('load', function(){
          // parse background with image and canvas
          sm.background = draw.BGParseOpt(sm.background, canvas);
          // set current state
          setState(sm, sm.currentState);
      });

  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
});

    };


    return api;

}());