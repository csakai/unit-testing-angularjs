(function() {
    var app = angular.module('app', [
        'app.items'
    ]);

    app.run(function(Items) {
        Items.index().then(function(data) {
            console.log('data', data);
        });
//        Items.add('nurrr').then(function(data) {
//            console.log('data?', data);
//        });
    });
})();
