(function() {
    var app = angular.module('app.items');
    app.directive('itemAdd', function() {
        return {
            require: '^^itemContainer',
            restrict: 'E',
            scope: {},
            link: linkFn,
            controller: controller,
            controllerAs: 'AddCtrl',
            templateUrl: 'src/items/item-add.directive.html'
        };

        function linkFn(scope, el, attr, containerCtrl) {
            _.assign(scope, containerCtrl);
            scope.AddCtrl.addingItem = false;
            scope.AddCtrl.item = '';
        }

        function controller($scope, Items) {
            this.addItem = function() {
                if (!this.itemForm.$valid || this.addingItem) {
                    return;
                }
                this.addingItem = true;
                var item = this.item;
                this.item = '';

                $scope.addItem(item);
                return Items.add(item)
                    .then(function() {
                        $scope.addSucceeded(item);
                    })
                    .catch((function(err) {
                        $scope.addFailed(item);
                        this.item = item;
                    }).bind(this))
                    .finally((function() {
                        this.addingItem = false;
                    }).bind(this));
            };
        }
    });
})();
