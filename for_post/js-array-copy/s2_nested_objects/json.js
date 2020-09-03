var a = [{
        pos: {
            x: 0,
            y: 0
        },
        hp: {
            current: 10,
            max: 100
        }
    }, {
        pos: {
            x: 45,
            y: 7
        },
        hp: {
            current: 100,
            max: 100
        }
    }
];

b = JSON.parse(JSON.stringify(a));
b[1].pos.y = 80;
b[1].hp.current = 0;
b[1].hp.max = 50;
b[1].hp.hpps = 10;

console.log(a[1]);
/*
{
    pos: {
        x: 45,
        y: 7
    },
    hp: {
        current: 100,
        max: 100
    }
}
*/
console.log(b[1]);
/*
{
    pos: {
        x: 45,
        y: 80
    },
    hp: {
        current: 0,
        max: 50,
        hpps: 10
    }
}
*/