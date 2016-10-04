(function() {
angular.module("templates", []).run(["$templateCache", function($templateCache) {
$templateCache.put("src/items/item-list.directive.html", "<ul>\n    <li\n        ng-repeat=\"item in items\">\n        {{item}}\n    </li>\n</ul>\n");
$templateCache.put("src/items/item-container.directive.html", "<div class=\"item-container\">\n    Items List\n    <item-list items=\"items\"></item-list>\n    <item-add></item-add>\n</div>\n\n");
$templateCache.put("src/items/item-add.directive.html", "<hr />\n<form\n    name=\"AddCtrl.itemForm\"\n    ng-submit=\"AddCtrl.addItem()\"\n    novalidate>\n    <label for=\"item-adder\">Item Name:</label>\n    <input\n        id=\"item-adder\"\n        type=\"text\"\n        name=\"item\"\n        ng-model=\"AddCtrl.item\"\n        ng-required=\"true\" />\n    <input\n        type=\"submit\"\n        value=\"Add!\"\n        ng-disabled=\"AddCtrl.addingItem\" />\n</form>\n");
}]);
})();