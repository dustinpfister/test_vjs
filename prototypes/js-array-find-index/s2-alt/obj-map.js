var people = [
    {name: 'John', grade: 'F', gradeNumber: 58, bestSub: 'pe'},
    {name: 'Beth', grade: 'C', gradeNumber: 72, bestSub: 'pe'},
    {name: 'Phil', grade: 'B', gradeNumber: 83, bestSub: 'science'},
    {name: 'Gary', grade: 'A', gradeNumber: 90, bestSub: 'art'},
    {name: 'Emme', grade: 'A', gradeNumber: 95, bestSub: 'social'}
];
// create weight objects
var weightObjects = people.map(function(obj, i){
    var weight = obj.gradeNumber;
    // 1.2x to weight if best subject is science
    if(obj.bestSub === 'science' || obj.bestSub === 'math'){
        weight = Math.floor(weight * 1.2);
    }
    return {
        weight: weight,
        index: i
    };
});
// sort weight objects array by weight
weightObjects.sort(function(a, b){
    if(a.weight > b.weight){
        return -1;
    }
    if(a.weight < b.weight){
        return 1;
    }
    return 0;
});
var index = weightObjects[0].index;
console.log(index);
/*
[
    { weight: 99, index: 2 },
    { weight: 95, index: 4 },
    { weight: 90, index: 3 },
    { weight: 72, index: 1 },
    { weight: 58, index: 0 }
]

*/