sm.states.loader = {
    key: 'loader',
    start: function(sm){
        if (sm.loader.json) {
            var i = 0,
            count = sm.loader.json.count = sm.loader.json.fileNames.length;
            sm.loader.json.loaded = 0;
            sm.loader.json.errorCount = 0;
            while (i < count) {
                (function (imageIndex) {
                    var fileName = sm.loader.json.fileNames[i];
                    utils.http({
                        url: sm.loader.json.baseURL + '/' + fileName + '.json',
                        // set to sm images if all goes well
                        onDone: function (json, xhr) {
                            try{
                                var dataObj = JSON.parse(json);
                                var dataKey = dataObj.dataKey || Object.keys(sm.data).length;
                                sm.data[dataKey] = dataObj;
                                sm.loader.json.loaded += 1;
                                if(sm.loader.json.loaded === count){
                                    sm.setState('title');
                                }
                            }catch(e){
                                sm.loader.json.errorCount += 1;
                            }
                        },
                        // what to do for an error
                        onError: function () {
                            // !!! should do something for any errors
                        }
                    });
                }(i));
                i += 1;
            }
        }
    },
    end: function(sm){
        console.log('loader state over');
        console.log(sm.data);
    },
    update: function(sm, secs){

    

    },
    draw: function(sm, layers){
        draw.back(sm);
        draw.ver(sm);
    }
};