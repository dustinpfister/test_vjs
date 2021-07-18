
var createShipPosString = function(mine){
    var posArr = '--------------------'.split(''),
    posIndex = Math.round(mine.ship.distance / mine.distance * 19);
    posArr[posIndex] = mine.ship.dir === 1 ? '>' : '<';
    return 'H) ' + posArr.join('') + ' (P';
};

// create and return html for a mine object
var createMineObjectHTML = function(mine){
    var container = document.createElement('div');
    container.id = 'mine_' + mine.name;
    // header
    var h1 = document.createElement('h1');
    h1.innerHTML = mine.name;
    container.appendChild(h1);
    // ship position
    var p = document.createElement('p');
    p.className ='shippos';
    p.innerHTML = createShipPosString(mine);
    container.appendChild(p);
    // disp elemets for each ore
    var ores = document.createElement('div');
    ores.className = 'orelist';
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

mine.oreRate = 0.5;
mine.ship.cargo = [];
mineMod.update(home, mine, 10);

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



var mountPoint = document.getElementById('app');

var mineDiv = createMineObjectHTML(mine);
mountPoint.appendChild(mineDiv);

//console.log(ship.over);
