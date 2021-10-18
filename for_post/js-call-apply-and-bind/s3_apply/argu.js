
var state = {
    count: 0,
    baseDelta: 1
};

var updateMethods = {
    optionOne: function (state, count, baseDelta, a) {
        a = a === undefined ? 0 : a;
        // referring to state by way of this keyword
        this.count = count + baseDelta + a;
    }
};

var updateState = function (state, methodKey) {
    var coreArgumnets = [state, state.count, state.baseDelta],
    // additional arguments array from arguments object thanks to splice and apply
    additionalArgumnets = [].slice.apply(arguments, [2, arguments.length]);
    var callArgumnets = coreArgumnets.concat(additionalArgumnets);
    // calling update method with apply
    updateMethods[methodKey].apply(state, callArgumnets);
    return state;
};

updateState(state, 'optionOne', 5);

console.log(state);
// { count: 6, baseDelta: 1 }
