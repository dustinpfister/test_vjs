let Grid = require('./grid.js'),
os = require('os');

let g = new Grid();

let printGrid = (grid)=> {
  
    grid.nodes.forEach((row) => {
       
        row.forEach((node) => {
            
            process.stdout.write(node.i + ':');
            
        });
        
        process.stdout.write(os.EOL);
        
    });
    
};

printGrid(g);

//console.log(g.nodes);
