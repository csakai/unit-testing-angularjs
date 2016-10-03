(function() {
    var app = angular.module('app');
    app.controller('appCtrl', function(Items) {
        var vm = this;
        init();

        function init() {
            Items.index()
                .then(function(data) {
                    vm.items = data;
                });
        }
    });
})();

