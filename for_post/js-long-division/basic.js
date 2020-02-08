// https://bocoup.com/blog/long-division-in-javascript
var div = function (n, d) {
    var num = String(n),
    numLength = num.length,
    remainder = 0,
    answer = '',
    i = 0;
    while (i < numLength + 3) {
        var digit = i < numLength ? parseInt(num[i]) : 0;
        if (i == numLength) {
            answer = answer + ".";
        }
        answer = answer + Math.floor((digit + (remainder * 10)) / d);
        remainder = (digit + (remainder * 10)) % d;
        i++;
    }
    return answer;
}

console.log(div('10', '2'));
