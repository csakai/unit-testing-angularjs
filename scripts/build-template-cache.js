var tcRender = require('ng-templatecache');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var templates = glob.sync('**/*.html', {
    cwd: 'client'
});

var tc = tcRender({
    entries: templates.map(function(tplPath) {
        return {
            content: fs.readFileSync(path.join('client', tplPath), 'utf-8'),
            path: tplPath
        };
    }),
    prefix: 'src/',
    standalone: true
});
tc = '(function() {\n' + tc + '\n})();';

fs.writeFileSync(path.join('client', 'templates.module.js'), tc, 'utf-8');
