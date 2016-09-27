var fs = require('fs');
var path = require('path');
var newLineWithIndent = '\n    ';
var filename = path.join('server', 'client-deps.js');

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
        sortAndUniq(deps, stripSpaces).join(',' + newLineWithIndent) +
        '\n];\n';
}

function identity(foo) {
    return foo;
}

function sortAndUniq(arr, perElemCb) {
    var cb = perElemCb || identity;
    var currentIndex = -1;
    return arr.map(perElemCb).sort().reduce(function(acc, elem, index, arr) {
        if (!index || acc[currentIndex] !== elem) {
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
                .split(/(\[\n|\n\])/gm)[1]
                .split(',\n')
        }
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
