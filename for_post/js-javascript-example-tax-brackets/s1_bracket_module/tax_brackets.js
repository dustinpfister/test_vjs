var tax = (function () {

    // 2019 hard table data
    // https://www.propublica.org/article/what-are-2019s-tax-brackets
    var hardTableData = '10:9700,12:39475,22:84200,24:160725,32:204100,35:510300,37:Infinity';

    // create a bracket object
    var createBracketObject = function (rate, lower, upper) {
        return {
            rate: rate,
            lower: lower,
            upper: upper,
            amount: 0,
            tax: 0
        };
    };

    // create brackets array
    var createBrackets = function (tableData) {
        tableData = tableData === undefined ? hardTableData : tableData;
        var lower = 0;
        return tableData.split(',').map(function (bracketData) {
            var bd = bracketData.split(':'),
            upper = bd[1] === 'Infinity' ? Infinity : parseInt(bd[1]),
            bracketObj = createBracketObject(parseInt(bd[0]), lower, upper);
            lower += parseInt(bd[1]) + 1;
            return bracketObj;
        });
    };

    // create a tax object
    var createTaxObject = function (tableData) {
        return {
            totalTax: 0,
            totalPercent: 0,
            brackets: createBrackets(tableData)
        };
    };

    // figure tax for the given income and brackets array
    var figureTax = function (income, brackets) {
        brackets = brackets === undefined ? createBrackets() : brackets;
        var m = income,
        base = 0,
        a = 0;
        return brackets.map(function (bracket) {
            base += bracket.lower;
            bracket.base = base;
            if (m <= bracket.upper - bracket.base) {
                a = m;
            } else {
                a = bracket.upper - bracket.base;
            }
            a = a < 0 ? 0 : a;
            m -= a;
            bracket.amount = a;
            bracket.tax = a * (bracket.rate / 100);
            //base += bracket.upper;
            return bracket;
        });
    };

    // add up a total tax amount with the given brackets
    // array
    var tabulateTaxAmounts = function (brackets) {
        return brackets.reduce(function (acc, bracket) {
            acc = typeof acc === 'object' ? acc.tax : acc;
            return acc + bracket.tax;
        });
    };

    // the public method
    return function (income, tableData) {
        var taxObj = createTaxObject(tableData);
        taxObj.brackets = figureTax(income, createBrackets(tableData));
        taxObj.totalTax = tabulateTaxAmounts(taxObj.brackets);
        taxObj.totalPercent = taxObj.totalTax / income;
        return taxObj;
    };

}
    ());
