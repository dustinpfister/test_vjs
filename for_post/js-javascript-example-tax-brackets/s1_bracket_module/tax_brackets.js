var tax = (function () {

    var hardTableData = '10:9700,12:39475';

    var createBracketObject = function (rate, lower, upper) {
        return {
            rate: rate,
            lower: lower,
            upper: upper,
            amount: 0
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

    var api = {
        createBrackets: createBrackets,
        income: function (income, brackets) {
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
                bracket.amount = a * (bracket.rate/ 100);
                return bracket;
            });
        }
    };

    return api; ;

}
    ());
