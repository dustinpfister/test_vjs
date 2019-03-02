var str = '{\"n\":\"27\"',
obj = {
    n: 42
};

try {
    obj = JSON.parse(str);
} catch (e) {
    console.log(e.message); // Unexpected end of JSON input
}
console.log(obj.n); // 42
