angular.module('app.items.directives.mocks')
    .directive('itemContainerChild', function() {
        return {
            restrict: 'A',
            require: '^^itemContainer',
            link: function(scope, el, attr, ctrl) {
                scope.ContainerCtrl = ctrl;
            },
            scope: {}
        };
    });
