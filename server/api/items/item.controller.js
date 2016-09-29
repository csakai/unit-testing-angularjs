var _ = require('lodash');
var Bluebird = require('bluebird');
var fs = require('fs');
Bluebird.promisifyAll(fs);

function ItemCtrl() {}

ItemCtrl.prototype.index = function index() {
    return new Bluebird(function(resolve, reject) {
        resolve(require('./items.json').items);
    });
};

ItemCtrl.prototype.add = function add(item) {
    var itemsContainer = require('./items.json');
    itemsContainer.items.push(item);
    return fs.writeFileAsync('items.js', JSON.stringify(itemsContainer), 'utf-8');
};

module.exports = ItemCtrl;

