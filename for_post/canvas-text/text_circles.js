
var tc = (function () {

    var api = {};

    return {

        createTextCircleObject: function (opt) {
            opt = opt || {};
            var tcObj = {};
            tcObj.ctx = opt.ctx || document.createElement('canvas').getContext('2d');
            tcObj.text = opt.text || 'text circle';
            tcObj.fontSize = opt.fontSize || 10;
            tcObj.fontFamily = opt.fontFamily || 'arial';
            tcObj.x = opt.x === undefined ? 0 : opt.x;
            tcObj.y = opt.y === undefined ? 0 : opt.y;
            tcObj.h = opt.h === undefined ? 0 : opt.h;
            tcObj.textStyles = ['red', 'black'];
            tcObj.circleStyles = ['white', 'black'];
            tcObj.ctx.save();
            tcObj.ctx.font = tcObj.fontSize + 'px ' + tcObj.fontFamily;
            tcObj.m = tcObj.ctx.measureText(tcObj.text);
            console.log(tcObj.ctx.font, tcObj.m.width);
            tcObj.r = Math.ceil(tcObj.m.width / 2);
            tcObj.ctx.restore();
            return tcObj;
        },

        draw: function (ctx, tcOpj) {
            var styles = [];
            ctx.save();
            ctx.translate(tcObj.x, tcObj.y);
            ctx.rotate(tcObj.h);
            // draw circle
            styles = tcObj.circleStyles || [];
            ctx.fillStyle = styles[0] || 'red';
            ctx.strokeStyle = styles[1] || 'black';
            ctx.beginPath();
            ctx.arc(0, 0, tcObj.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
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

    };

}
    ());
