(function() {
    var app = angular.module('app.items');
    app.directive('itemContainer', function() {
        return {
            restrict: 'E',
            controller: controller,
            scope: {
                items: '='
            },
            templateUrl: 'src/items/item-container.directive.html'
        };
        function controller($scope) {
            var ITEM_ADDED = this.ITEM_ADDED = 'ITEM_ADDED';
            var ITEM_ADD_SUCCEEDED = this.ITEM_ADD_SUCCEEDED = 'ITEM_ADD_SUCCEEDED';
            var ITEM_ADD_FAILED = this.ITEM_ADD_FAILED = 'ITEM_ADD_FAILED';

            this.addItem = function(item) {
                $scope.$broadcast(ITEM_ADDED, item);
            };

            this.addFailed = function(item) {
                $scope.$broadcast(ITEM_ADD_FAILED, item);
            };

            this.addSucceeded = function(item) {
                $scope.$broadcast(ITEM_ADD_SUCCEEDED, item);
            };
        }
    });
})(); 
