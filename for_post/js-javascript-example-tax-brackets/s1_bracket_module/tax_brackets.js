var tax = (function () {

    var hardTableData = '10:9700,12:39475';

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
            bracketObj = createBracketObject(parseInt(bd[0]), lower, parseInt(bd[1]));
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

            return taxObj;
        }
    };

    return api; ;

}
    ());
