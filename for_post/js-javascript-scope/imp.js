// implicit global

var func = function () {
    var local = 5;
    global = 3;
};

func();

console.log(global); // 3
try {
    console.log(local);
} catch (e) {
    console.log(e.message); // local is not defined
}
