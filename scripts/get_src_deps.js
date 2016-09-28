var glob = require('glob');
module.exports = function() {
    return glob.sync('**/*.module.js', {
        cwd: 'client',
        ignore: '**/*.spec.js'
    }).concat(glob.sync('**/*.js', {
        cwd: 'client',
        ignore: ['**/*.module.js', '**/*.spec.js']
    }));
};
