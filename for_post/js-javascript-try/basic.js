var str = '{\"n\":\"foo\"';

try {
    JSON.parse(str);
} catch (e) {
    console.log(e.message); // Unexpected end of JSON input
}
