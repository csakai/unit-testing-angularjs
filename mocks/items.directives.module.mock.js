angular.module('app.items.directives.mocks', [])
    .run(function($templateCache) {
        $templateCache.put('src/items/item-container.directive.html', '<div><div item-container-child></div></div>');
    });

