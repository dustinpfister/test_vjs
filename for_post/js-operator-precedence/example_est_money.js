let pageMoney = (s, c, ct, ctr, rpm) => {
    return s / c * ct * ctr * rpm;
};

let ctrRates = [0.8, 0.1, 0.05, 0.025];
ctrRates.forEach((ctr, i) => {
    console.log(i + 1, '$' + pageMoney(50, 36, 6.5, ctr, 1.6).toFixed(2));
});
// 1 $11.56
// 2 $1.44
// 3 $0.72
// 4 $0.36
