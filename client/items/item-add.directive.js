(function() {
    var app = angular.module('app.items');
    app.directive('itemAdd', function() {
        return {
            require: '^itemContainer',
            restrict: 'E',
            scope: {},
            link: linkFn,
            controller: controller,
            controllerAs: 'AddCtrl',
            templateUrl: 'src/items/item-add.directive.html'
        };

        function linkFn(scope, el, attr, containerCtrl) {
            _.assign(scope, containerCtrl);

            scope.addingItem = false;
        }

        function controller($scope, Items) {
            this.item = '';
            this.addItem = function() {
                if (!this.itemForm.$valid || $scope.addingItem) {
                    return;
                }
                $scope.addingItem = true;
                var item = this.item;
                this.item = '';

                $scope.addItem(item);
                Items.add(item)
                    .then($scope.addSucceeded.bind($scope, item))
                    .catch((function(err) {
                        $scope.addFailed(item);
                        this.item = item;
                    }).bind(this))
                    .finally(function() {
                        $scope.addingItem = false;
                    });
            };
        }
    });
})();
