var posts = [
   { wc: 1800, bl: 0, date: '2017-10-02'},
   { wc: 1017, bl: 5, date: '2021-03-17'},
   { wc: 1350, bl: 3, date: '2020-08-30'}
];

// create weight objects array
var weightObjects = posts.map(function(post, index){
    var wcScore = 1000 * ( post.wc >= 1800 ? 1 : post.wc / 1800 ),
    blScore = 1000 * ( post.bl >= 5 ? 1 : post.bl / 5 ),
    freshScore = 0;
    return {
        weight: wcScore + blScore + freshScore,
        index: index
    };
});

console.log(weightObjects);

// sort the weight objects