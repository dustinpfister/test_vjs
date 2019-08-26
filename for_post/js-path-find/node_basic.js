let Grid = require('./grid.js'),
os = require('os');

let g = new Grid();

let printGrid = (grid)=> {
    
    var tiles = ['.', 'S', 'E', '#'];
  
    grid.nodes.forEach((row) => {
       
        row.forEach((node) => {
            
            process.stdout.write(tiles[node.ti]);
            
        });
        
        process.stdout.write(os.EOL);
        
    });
    
};

printGrid(g);

