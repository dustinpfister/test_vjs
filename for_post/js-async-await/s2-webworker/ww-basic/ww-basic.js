onmessage = function(e) {
  postMessage(e.data[0] + 'bar');
};