let heavyAsync = async function () {
    var i = Math.pow(10, 9),
    st = new Date();
    while (i--) {}
    console.log('heavy time: ', new Date() - st);
};
heavyAsync();
