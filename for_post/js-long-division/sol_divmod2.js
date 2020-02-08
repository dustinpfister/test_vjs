var BASE = 1e7,
MAX_INT = 9007199254740992,
MAX_INT_ARR = smallToArray(MAX_INT);

// trim
function trim(v) {
    var i = v.length;
    while (v[--i] === 0);
    v.length = i + 1;
};

function truncate(n) {
        if (n > 0) return Math.floor(n);
        return Math.ceil(n);
    }

function createArray(length) { // function shamelessly stolen from Yaffle's library https://github.com/Yaffle/BigInteger
    var x = new Array(length);
    var i = -1;
    while (++i < length) {
        x[i] = 0;
    }
    return x;
};

function divModSmall(value, lambda) {
    var length = value.length,
    quotient = createArray(length),
    base = BASE,
    i,
    q,
    remainder,
    divisor;
    remainder = 0;
    for (i = length - 1; i >= 0; --i) {
        divisor = remainder * base + value[i];
        q = truncate(divisor / lambda);
        remainder = divisor - q * lambda;
        quotient[i] = q | 0;
    }
    return [quotient, remainder | 0];
};

// compare ABS
function compareAbs(a, b) {
    if (a.length !== b.length) {
        return a.length > b.length ? 1 : -1;
    }
    for (var i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i])
            return a[i] > b[i] ? 1 : -1;
    }
    return 0;
};

// assumes a is array, b is number with |b| < BASE
function multiplySmall(a, b) {
    var l = a.length,
    r = new Array(l),
    base = BASE,
    carry = 0,
    product,
    i;
    for (i = 0; i < l; i++) {
        product = a[i] * b + carry;
        carry = Math.floor(product / base);
        r[i] = product - carry * base;
    }
    while (carry > 0) {
        r[i++] = carry % base;
        carry = Math.floor(carry / base);
    }
    return r;
};

function subtract(a, b) { // assumes a and b are arrays with a >= b
    var a_l = a.length,
    b_l = b.length,
    r = new Array(a_l),
    borrow = 0,
    base = BASE,
    i,
    difference;
    for (i = 0; i < b_l; i++) {
        difference = a[i] - borrow - b[i];
        if (difference < 0) {
            difference += base;
            borrow = 1;
        } else
            borrow = 0;
        r[i] = difference;
    }
    for (i = b_l; i < a_l; i++) {
        difference = a[i] - borrow;
        if (difference < 0)
            difference += base;
        else {
            r[i++] = difference;
            break;
        }
        r[i] = difference;
    }
    for (; i < a_l; i++) {
        r[i] = a[i];
    }
    trim(r);
    return r;
};

function arrayToSmall(arr) { // If BASE changes this function may need to change
    trim(arr);
    var length = arr.length;
    if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
        switch (length) {
        case 0:
            return 0;
        case 1:
            return arr[0];
        case 2:
            return arr[0] + arr[1] * BASE;
        default:
            return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
        }
    }
    return arr;
};

function smallToArray(n) { // For performance reasons doesn't reference BASE, need to change this function if BASE changes
    if (n < 1e7)
        return [n];
    if (n < 1e14)
        return [n % 1e7, Math.floor(n / 1e7)];
    return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
}

function divMod1(a, b) { // Left over from previous version. Performs faster than divMod2 on smaller input sizes.
    var a_l = a.length,
    b_l = b.length,
    base = BASE,
    result = createArray(b.length),
    divisorMostSignificantDigit = b[b_l - 1],
    // normalization
    lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
    remainder = multiplySmall(a, lambda),
    divisor = multiplySmall(b, lambda),
    quotientDigit,
    shift,
    carry,
    borrow,
    i,
    l,
    q;
    if (remainder.length <= a_l)
        remainder.push(0);
    divisor.push(0);
    divisorMostSignificantDigit = divisor[b_l - 1];
    for (shift = a_l - b_l; shift >= 0; shift--) {
        quotientDigit = base - 1;
        if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
            quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
        }
        // quotientDigit <= base - 1
        carry = 0;
        borrow = 0;
        l = divisor.length;
        for (i = 0; i < l; i++) {
            carry += quotientDigit * divisor[i];
            q = Math.floor(carry / base);
            borrow += remainder[shift + i] - (carry - q * base);
            carry = q;
            if (borrow < 0) {
                remainder[shift + i] = borrow + base;
                borrow = -1;
            } else {
                remainder[shift + i] = borrow;
                borrow = 0;
            }
        }
        while (borrow !== 0) {
            quotientDigit -= 1;
            carry = 0;
            for (i = 0; i < l; i++) {
                carry += remainder[shift + i] - base + divisor[i];
                if (carry < 0) {
                    remainder[shift + i] = carry + base;
                    carry = 0;
                } else {
                    remainder[shift + i] = carry;
                    carry = 1;
                }
            }
            borrow += carry;
        }
        result[shift] = quotientDigit;
    }
    // denormalization
    remainder = divModSmall(remainder, lambda)[0];
    return [arrayToSmall(result), arrayToSmall(remainder)];
}

// Implementation idea shamelessly stolen from Silent Matt's library http://silentmatt.com/biginteger/
// Performs faster than divMod1 on larger input sizes.
function divMod2(a, b) {

    var a_l = a.length,
    b_l = b.length,
    result = [],
    part = [],
    base = BASE,
    guess,
    xlen,
    highx,
    highy,
    check;
    while (a_l) {
        part.unshift(a[--a_l]);
        trim(part);
		console.log(part);
        if (compareAbs(part, b) < 0) {
            result.push(0);
            continue;
        }
        xlen = part.length;
        highx = part[xlen - 1] * base + part[xlen - 2];
        highy = b[b_l - 1] * base + b[b_l - 2];
        if (xlen > b_l) {
            highx = (highx + 1) * base;
        }
        guess = Math.ceil(highx / highy);
        do {
            check = multiplySmall(b, guess);
            if (compareAbs(check, part) <= 0)
                break;
            guess--;
        } while (guess);
        result.push(guess);
        part = subtract(part, check);
    }
    result.reverse();
    return [arrayToSmall(result), arrayToSmall(part)];
};

console.log( multiplySmall('1000'.split(''), 5) );

//console.log(divMod2('1000'.split(''), '5'.split('')));
