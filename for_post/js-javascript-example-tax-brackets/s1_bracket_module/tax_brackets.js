var tax = (function () {

    // 2019 hard table data
    // https://www.propublica.org/article/what-are-2019s-tax-brackets
    var hardTableData = '10:9700,12:39475,22:84200,24:160725,32:204100,35:510300,37:Infinity';

    var createBracketObject = function (rate, lower, upper) {
        return {
            rate: rate,
            lower: lower,
            upper: upper,
            amount: 0,
            tax: 0
        };
    };

    var createBrackets = function (tableData) {
        tableData = tableData === undefined ? hardTableData : tableData;
        var lower = 0;
        return tableData.split(',').map(function (bracketData) {
            var bd = bracketData.split(':'),
            upper = bd[1] === 'Infinity' ? Number.MAX_SAFE_INTEGER : parseInt(bd[1]),
            bracketObj = createBracketObject(parseInt(bd[0]), lower, upper);
            lower += parseInt(bd[1]) + 1;
            return bracketObj;
        });
    };

    var createTaxObject = function (tableData) {
        return {
            totalTax: 0,
            totalPercent: 0,
            brackets: createBrackets(tableData)
        };
    };

    var figureTax = function (income, brackets) {
        brackets = brackets === undefined ? createBrackets() : brackets;
        var m = income,
        a = 0;
        return brackets.map(function (bracket) {
            if (m <= bracket.upper) {
                a = m;
            } else {
                a = bracket.upper;
            }
            m -= a;
            bracket.amount = a;
            bracket.tax = a * (bracket.rate / 100);
            return bracket;
        });
    };

    var tabulateTaxAmounts = function (brackets) {
        return brackets.reduce(function (acc, bracket) {
            acc = typeof acc === 'object' ? acc.tax : acc;
            return acc + bracket.tax;
        });
    };

    var api = {
        income: function (income, tableData) {

            var taxObj = createTaxObject(tableData);

            taxObj.brackets = figureTax(income, createBrackets(tableData));
            taxObj.totalTax = tabulateTaxAmounts(taxObj.brackets);
            taxObj.totalPercent = taxObj.totalTax / income;

            return taxObj;
        }
    };

    return api; ;

}
    ());
