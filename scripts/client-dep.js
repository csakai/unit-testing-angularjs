var fs = require('fs');
var path = require('path');
var newLineWithIndent = '\n    ';
var filename = path.join('server', 'vendor-deps.js');
var reorder = require('./reorder_vendor');

function getMain(pkgName) {
    var pkg;
    try {
        pkg = require(path.join('../node_modules', pkgName, 'bower.json'));
    } catch(e) {
        pkg = require(path.join('../node_modules', pkgName, 'package.json'));
    }
    return path.join(pkgName, pkg.main);
}

function stripVer(str) {
    return stripSpaces(str).split('@')[0];
}

function stripSpaces(str) {
    return str.replace(/(^\s+|\s+$)/g, '');
}

function wrapDeps(deps) {
    return 'module.exports = [' +
        newLineWithIndent +
        sortAndUniq(deps, true, stripSpaces).join(',' + newLineWithIndent) +
        '\n];\n';
}

function identity(foo) {
    return foo;
}

function sortAndUniq(arr, shouldCompact, perElemCb) {
    var cb = perElemCb || identity;
    var currentIndex = -1;
    return arr.map(cb)
        .sort()
        .reduce(function(acc, elem, index, arr) {
            var shouldAddElem = !shouldCompact || elem,
                isNotDuplicate = ~currentIndex || acc[currentIndex] !== elem;
            if (shouldAddElem && isNotDuplicate) {
                acc.push(elem);
                currentIndex++;
            }
            return acc;
        }, []);
}

function readWriteAsync(filename, newDeps) {
    fs.readFile(filename, 'utf-8', function(err, data){
        var deps = [];
        var fileText;
        if (err && err.code !== "ENOENT") {
            throw err;
        } else if (!err) {
            deps = data
                .split(/\[/)[1]
                .split(/\];/)[0]
                .split(',\n')
        }
        reoder(newDeps);
        newDeps = newDeps.map(function(dep) {
            return '"' + getMain(stripVer(dep)) + '"';
        });
        fileText = wrapDeps(deps.concat(newDeps));
        fs.writeFile(filename, fileText, 'utf-8', function(err) {
            if (err) throw err;
            console.log('async write done');
        });
    });
}
var deps = process.argv.slice(2);

readWriteAsync(filename, deps);
