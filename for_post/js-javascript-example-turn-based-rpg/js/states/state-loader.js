sm.states.loader = {
    key: 'loader',
    start: function(sm){
        // check for sm.loader.json
        if (sm.loader.json) {
            // defaults for sm.loader.json
            var jl = sm.loader.json;
            i = 0,
            count = jl.count = jl.fileNames.length;
            jl.loaded = 0;
            jl.errorCount = 0;
            jl.errors = [];
            // file protocol? Then do not even try
            if(location.protocol === 'file:'){
                jl.errorCount = 1;
                jl.errors.push('Game is running under file protocol.');
                return;
            }
            // http or https assumed at this point
            while (i < count) {
                (function (imageIndex) {
                    var fileName = jl.fileNames[i];
                    utils.http({
                        url: jl.baseURL + '/' + fileName + '.json',
                        // set to sm images if all goes well
                        onDone: function (json, xhr) {
                            try{
                                var dataObj = JSON.parse(json);
                                var dataKey = dataObj.dataKey || Object.keys(sm.data).length;
                                sm.data[dataKey] = dataObj;
                                jl.loaded += 1;
                                if(jl.loaded === count){
                                    sm.setState('title');
                                }
                            }catch(e){
                                jl.errorCount += 1;
                                jl.errors.push('failed to parse JSON for file ' + fileName + '.json');
                            }
                        },
                        // what to do for an error
                        onError: function (xhr) {
                            jl.errorCount += 1;
                            jl.errors.push('did not get a 200 status for file ' + fileName + '.json');
                        }
                    });
                }(i));
                i += 1;
            }
        }else{
            // no json object in loader object
            jl.errorCount = 1;
            jl.errors.push('no json object in sm.loader.');
        }
    },
    end: function(sm){
        var jl = sm.loader.json;
        utils.log('**********', 'debug');
        utils.log('loader state over: ', 'debug');
        utils.log('loaded: ' + jl.loaded + ' / ' + jl.count, 'debug');
        utils.log('errors: ' + jl.errorCount, 'debug');
        utils.log(jl.errors, 'debug');
        utils.log('**********', 'debug');
    },
    update: function(sm, secs){
        // if we have so much as just one error
        // switch to title and go with hard coded stuff
        if(sm.loader.json.errorCount > 0){
            sm.setState('title');
        }
    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.ver(sm);
    }
};