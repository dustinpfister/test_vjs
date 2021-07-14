
var createDateArray = function (dateString) {
    return dateString.split(/[.,\/ -]/)
};


console.log( createDateArray('05/25/2021') );
console.log( createDateArray('02.13.2020') );

