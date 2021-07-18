var home = homeMod.create();
var mine = mineMod.create(home, {
        name: 'Furea',
        index: 0,
        distance: 100,
        ores: [{
                index: 0,
                points: 3
            }, {
                index: 1,
                points: 1
            }
        ]
    });
mine.ship.dir = 1;
mine.ship.distance = 0;
mine.oreRate = 1;

var mountPoint = document.getElementById('app');

var homeDiv = html.createHomeObjectHTML(home);
mountPoint.appendChild(homeDiv);

var mineDiv = html.createMineObjectHTML(mine);
mountPoint.appendChild(mineDiv);

var lt = new Date();
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    setTimeout(loop, 100);
    if(secs >= 1){
        mineMod.update(home, mine, secs);
        html.updateMineObjectHTML(mountPoint, mine);
        html.updateHomeObjectHTML(mountPoint, home);
        lt = now;
    }
};
loop();