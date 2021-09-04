var http = function (argu, done, fail) {
    var xhr = new XMLHttpRequest();
    // if first argument is a string, assume it is a url for a get request
    if (typeof argu === 'string') {
        argu = {
            url: argu
        }
    }
    // use given argu object or default to an empty object
    argu = argu || {};
    // default method is GET, payload is null, and URL is location.href
    argu.method = argu.method || 'GET';
    argu.playload = argu.payload === undefined ? null : argu.payload;
    argu.url = argu.url || location.href;
    // default done and fail callbacks
    argu.done = done || argu.done || function (res) { console.log(res);};
    argu.fail = fail || argu.fail || function () {};
    // given, or default beforeSend method
    argu.beforeSend = argu.beforeSend || function (xhr, next) {
        // if POST request, assume JSON
        if (argu.method.toUpperCase() === 'POST') {
            xhr.setRequestHeader('Content-type', 'application/json');
            // custom send that uses JSON
            argu.send = function (xhr,argu) {
                xhr.send(JSON.stringify(argu.payload));
            };
        }
        next();
    };
    // given or default send method
    argu.send = argu.send || function (xhr,argu) {
        // just send
        xhr.send(argu.payload);
    };
    // open the request
    xhr.open(argu.method, argu.url, true);
    // setup on ready state method to call done or fail methods
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                argu.done.call(this, this.response);
            } else {
                argu.fail.call(this);
            }
        }
    };
 
    // call before send, and send request
    argu.beforeSend(xhr, function () {
        argu.send(xhr,argu);
    });
 
};