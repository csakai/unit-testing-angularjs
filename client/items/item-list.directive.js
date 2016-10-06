(function() {
    var app = angular.module('app.items');
    app.directive('itemList', function($log) {
        return {
            link: linkFn,
            restrict: 'E',
            require: '^^itemContainer',
            scope: {
                items: '='
            },
            templateUrl: 'src/items/item-list.directive.html'
        };

        function linkFn(scope, el, attr, containerCtrl) {
            var ITEM_ADDED = containerCtrl.ITEM_ADDED,
                ITEM_ADD_SUCCEEDED = containerCtrl.ITEM_ADD_SUCCEEDED,
                ITEM_ADD_FAILED = containerCtrl.ITEM_ADD_FAILED;

            scope.$on(ITEM_ADDED, function(event, item) {
                scope.items.push(item);
            });

            scope.$on(ITEM_ADD_FAILED, function(event, item) {
                scope.items.pop();
                $log.info(ITEM_ADD_FAILED, ': ', item);
            });

            scope.$on(ITEM_ADD_SUCCEEDED, function(event, item) {
                $log.info(ITEM_ADD_SUCCEEDED, ': ', item);
            });
        }
    });
})();
