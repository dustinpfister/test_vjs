let reducer = (acc, el, index, array) => {
    console.log(acc, el, index, array);
    return acc + el;
};

let arr = [7, 8, 9, 10]

let n = arr.reduce(reducer, 0);
//0 7 0 [ 7, 8, 9, 10 ]
//7 8 1 [ 7, 8, 9, 10 ]
//15 9 2 [ 7, 8, 9, 10 ]
//24 10 3 [ 7, 8, 9, 10 ]
