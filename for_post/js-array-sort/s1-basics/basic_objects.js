var arr = [
    {hp: 0}, 
    {hp: 57}, 
    {hp: 50},
    {hp: 0},
    {hp: 7}
];

arr.sort(function (a, b) {
    if (a.hp > b.hp) {
        return -1;
    }
    if (a.hp < b.hp) {
        return 1;
    }
    return 0;
});

console.log(arr.map((e) => e.hp).join(':'));
// 57:50:7:0:0
