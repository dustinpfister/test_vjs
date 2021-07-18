
// create and return a ship position string for the given mine object
// ( H) --------->---------- (P )
var createShipPosString = function(mine){
    var posArr = '--------------------'.split(''),
    posIndex = Math.round(mine.ship.distance / mine.distance * 19);
    posArr[posIndex] = mine.ship.dir === 1 ? '>' : '<';
    return 'H) ' + posArr.join('') + ' (P';
};

// create and return HTML for a mine object
var createMineObjectHTML = function(mine){
    var container = document.createElement('div');
    container.id = 'minedisp_' + mine.name + '_' + mine.index;
    container.className = 'minedisp';
    // header
    var h1 = document.createElement('h1');
    h1.innerHTML = mine.name;
    container.appendChild(h1);
    // ship position
    var p = document.createElement('p');
    p.className = 'minedisp_ship_pos';
    p.innerHTML = createShipPosString(mine);
    container.appendChild(p);
    // disp elemets for each ore
    var ores = document.createElement('div');
    ores.className = 'minedisp_orelist';
    mine.ores.forEach(function(ore){
        var p = document.createElement('span');
        p.innerHTML = ore.name + ' : ' + ore.amount + '<br>';
        ores.appendChild(p);
    });
    container.appendChild(ores);
    return container;
};







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
mine.ship.cargo = [];
mineMod.update(home, mine, 0);

/*
var ship = mine.ship;
console.log('ship distance: ', ship.distance);
console.log('ship dir: ', ship.dir);
console.log('cargo: ', mine.ship.cargo);
var over = ship.over;
console.log('over dist: ' + over.distance);
console.log('over round trips: ' + over.roundTrips);
console.log('');
mine.ores.forEach(function(ore, i){
    console.log('mine ore ' + i + ': ', ore.name, ore.amount);
});
console.log('');
home.oreCollection.forEach(function(ore, i){
    console.log('home ore ' + i + ': ', ore.name, ore.amount);
});
*/


var mountPoint = document.getElementById('app');
var mineDiv = createMineObjectHTML(mine);
mountPoint.appendChild(mineDiv);

//var nodes = mountPoint.querySelectorAll('.minedisp');
//console.log(nodes[0].id.split('_')[1]); // name of mine
//console.log(nodes[0].id.split('_')[2]); // index of mine

var lt = new Date();
var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    setTimeout(loop, 100);
    if(secs >= 1){
        mineMod.update(home, mine, secs);
        var nodes = mountPoint.querySelectorAll('.minedisp');
        var mineDiv = nodes[0];
        var shipPos = mineDiv.querySelector('.minedisp_ship_pos');
        shipPos.innerText = createShipPosString(mine);
        console.log();
        lt = now;
    }
};
loop();