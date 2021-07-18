
var html = {};

// create and return a ship position string for the given mine object
// ( H) --------->---------- (P )
html.createShipPosString = function(mine){
    var posArr = '--------------------'.split(''),
    posIndex = Math.round(mine.ship.distance / mine.distance * 19);
    posArr[posIndex] = mine.ship.dir === 1 ? '>' : '<';
    return 'H) ' + posArr.join('') + ' (P';
};

// create and return HTML for a mine object
html.createMineObjectHTML = function(mine){
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
    p.innerHTML = html.createShipPosString(mine);
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

html.updateMineObjectHTML = function(mountPoint, mine){
    var nodes = mountPoint.querySelectorAll('.minedisp');

    var mineDiv = nodes[mine.index];
    var shipPos = mineDiv.querySelector('.minedisp_ship_pos');
    shipPos.innerText = html.createShipPosString(mine);

    var oreList = mineDiv.querySelector('.minedisp_orelist');
    [].forEach.call(oreList.children, function(span, i){
        var ore = mine.ores[i];
        span.innerHTML = ore.name + ' : ' + ore.amount.toFixed(2) + '<br>';
    });
};
