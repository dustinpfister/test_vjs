var findByPropValue = function(objs, propName, propValue, getIndex){
    var method = getIndex ? 'findIndex': 'find';
    return objs[method](function(obj){
        return obj[propName] === propValue;
    });
};
var people = [
    {id: '1', name: 'John', grade: 'F'},
    {id: '2', name: 'Beth', grade: 'C'},
    {id: '3', name: 'Phil', grade: 'C'},
    {id: '4', name: 'Gary', grade: 'A'},
    {id: '5', name: 'Emme', grade: 'A'}
];
console.log( findByPropValue(people, 'id', '3', false) );
// { id: '3', name: 'Phil', grade: 'C' }
console.log( findByPropValue(people, 'id', '3', true) );
// 2