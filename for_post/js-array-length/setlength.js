var print = function (arr) {
    arr.forEach(function (el, i) {
        console.log(i, ':', el)
    });
    console.log('length: ', arr.length);
    console.log('*****')
};

var a = [1, 2, 3];
print(a);
a.length = 1;
print(a);
a.length = 5;
print(a);

/*
0 ':' 1
1 ':' 2
2 ':' 3
length:  3
*****
0 ':' 1
length:  1
*****
0 ':' 1
length:  5
*****
*/