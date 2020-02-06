
var tc = {};

tc.createTextCircleObject = function (opt) {
    opt = opt || {};
    var tcObj = {};
    tcObj.text = opt.text || 'text circle';
    tcObj.fontSize = opt.fontSize || 10;
    tcObj.fontFamily = opt.fontFamily || 'arial';
    tcObj.x = opt.x === undefined ? 0 : opt.x;
    tcObj.y = opt.y === undefined ? 0 : opt.y;
    tcObj.r = opt.r === undefined ? 25 : opt.r;
    tcObj.h = opt.h === undefined ? 0 : opt.h;

    tcObj.textStyles = ['red', 'black'];
    tcObj.circleStyles = ['white', 'black'];
    return tcObj;
};

tc.draw = function (ctx, tcOpj) {

    var styles = [];

    ctx.save();

    ctx.translate(tcObj.x, tcObj.y);

    // draw text
    ctx.font = tcObj.fontSize + 'px ' + tcObj.fontFamily;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    styles = tcObj.textStyles || [];
    ctx.fillStyle = styles[0] || 'red';
    ctx.strokeStyle = styles[1] || 'black';
    ctx.fillText(tcObj.text, 0, 0);
    ctx.strokeText(tcObj.text, 0, 0);
    ctx.restore();

}
