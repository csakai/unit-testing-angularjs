(function() {
    var app = angular.module('app.items', []);
    app.config(function($httpProvider, APP_NAME) {
        $httpProvider.defaults.headers.common['App-Name'] = APP_NAME;
    });
})();

