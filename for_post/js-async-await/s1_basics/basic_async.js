let foo = async (delay) => {
    let st = new Date(),
    now = st,
    t = 0;
    while(t < delay){
        now = new Date();
        t = now - st;
    }
    return 1;
};

let bar = async ()=> {
    console.log('start');
    await foo(3000);
    console.log('end');
};

bar();
