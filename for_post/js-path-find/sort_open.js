var sortOpen = function(open){
    return open.sort(function(nodeA, nodeB){
        if(nodeA.weight < nodeB.weight){
            return 1;
        }
        if(nodeA.weight > nodeB.weight){
            return -1;
        }
        return 0;
    });
};

var open = [
    {weight: 12},{weight: 5},{weight: 3},{weight: 7}
];

sortOpen(open);

console.log(open);
// [ { weight: 12 }, { weight: 7 }, { weight: 5 }, { weight: 3 } ]
console.log(open.pop());
// { weight: 3 }
