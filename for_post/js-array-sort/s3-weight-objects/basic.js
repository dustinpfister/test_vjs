var posts = [
   { wc: 1800, bl: 0, date: '2017-10-02'},
   { wc: 1017, bl: 5, date: '2021-03-17'},
   { wc: 1350, bl: 3, date: '2020-08-30'}
];

// create weight objects array
var weightObjects = posts.map(function(post, index){
    var wcScore = 1000 * ( post.wc >= 1800 ? 1 : post.wc / 1800 ),
    blScore = 1000 * ( post.bl >= 5 ? 1 : post.bl / 5 );
    return {
        weight: wcScore + blScore,
        index: index
    };
});
console.log(weightObjects);
/*
[
  { weight: 1000, index: 0 },
  { weight: 1565, index: 1 },
  { weight: 1350, index: 2 }
]
*/


// sort the weight objects by the weight property
weightObjects.sort(function(a, b){
    if(a.weight > b.weight){
        return -1;
    }
    if(a.weight < b.weight){
        return 1;
    }
    return 0;
});

console.log(weightObjects);
/*
[
  { weight: 1565, index: 1 },
  { weight: 1350, index: 2 },
  { weight: 1000, index: 0 }
]
*/

// use the index prop, or attach objects references to get the best post
console.log( posts[weightObjects[0].index] );