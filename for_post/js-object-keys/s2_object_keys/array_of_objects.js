//let points = [{x47: 0, y32: 0 }, {x13: 0, y7: 0 }, {x0: 0, y50: 0 } ];

let arr = points.map((obj) => {
        return Object.keys(obj).map((key) => {
            return key.split(/x|y/)[1];
        })
    });

console.log(arr);
// [ [ '47', '32' ], [ '13', '7' ], [ '0', '50' ] ]
