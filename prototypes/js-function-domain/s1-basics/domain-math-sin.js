// create a domain for a Math.sin
var createDomain = function(totalDivs){
    var div = 0,
    domain = [];
    while(div < totalDivs){
        domain.push( Math.PI * 2 / totalDivs * div );
        div += 1;
    }
    return domain;
};

// eight directions
var domain = createDomain(8);
console.log(domain);
/*
[ 0,
  0.7853981633974483,
  1.5707963267948966,
  2.356194490192345,
  3.141592653589793,
  3.9269908169872414,
  4.71238898038469,
  5.497787143782138 ]
*/
console.log( domain.map(Math.sin) );
/*
[ 0,
  0.7071067811865475,
  1,
  0.7071067811865476,
  1.2246467991473532e-16,
  -0.7071067811865475,
  -1,
  -0.7071067811865477 ]
*/