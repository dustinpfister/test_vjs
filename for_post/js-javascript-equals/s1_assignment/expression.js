
let func1 = (a) => {
    let b = a == undefined ? 0 : a;
    console.log(b);
    return b;
};

let func2 = (a) => {
    let b = a === undefined ? 0 : a;
    console.log(b);
    return b;
};


func1()     // 0
func1(null) // 0

func2()     // 0
func2(null) // null