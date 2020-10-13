var valJSON = function (str) {

    try {
        JSON.parse(str);
        return 'foo';
    } catch (e) {
        return 'bar'; // Unexpected end of JSON input
    }
    finally {
        return 'baz';
    }

};

console.log(valJSON('{\"n\":\"foo\"')); // 'baz'
