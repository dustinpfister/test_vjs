var people = [
    {name: 'John', grade: 'F'},
    {name: 'Beth', grade: 'C'},
    {name: 'Phil', grade: 'C'},
    {name: 'Gary', grade: 'A'},
    {name: 'Emme', grade: 'A'}
];
// get first A grade object
var firstA = people.findIndex(function (el) {
        return el.grade === 'A';
    });
console.log(firstA); // 3
console.log(people[firstA]); // { name: 'Gary', grade: 'A' }