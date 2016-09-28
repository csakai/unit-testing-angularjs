var _ = require('lodash');
module.exports = function(arr) {
    var patterns = [ /^angular\//i, /^jquery\//i ];
    var wrapped = _.chain(arr);
    for (var i = 0, j = patterns.length; i < j; i++) {
        wrapped
            .findIndex(patterns[i].test.bind(patterns[i]))
            .thru(function(index) {
                arr.unshift(arr.splice(index, 1)[0]);
                return arr;
            })
            .commit();
    }
    return arr;
};

