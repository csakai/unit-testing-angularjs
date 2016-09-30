var _ = require('lodash');
var Bluebird = require('bluebird');
var fs = require('fs');
var path = require('path');
Bluebird.promisifyAll(fs);

function ItemCtrl() {
    this.itemsContainer = require('./items.json');
}

ItemCtrl.prototype.index = function index() {
    return new Bluebird((function(resolve, reject) {
        resolve(this.itemsContainer.items);
    }).bind(this));
};

ItemCtrl.prototype.add = function add(item) {
    this.itemsContainer.items.push(item);
    return fs.writeFileAsync(path.join(__dirname, 'items.json'), JSON.stringify(this.itemsContainer), 'utf-8');
};

module.exports = ItemCtrl;

