var posts = [
   { wc: 1800, bl: 0, date: '2017-10-02'},
   { wc: 1017, bl: 5, date: '2021-03-17'},
   { wc: 1350, bl: 3, date: '2017-10-02'}
];

var weightObjects = posts.map(function(post, index){
	return {
		weight: wcSore + blScore + freshScore,
		index: index
	};
});