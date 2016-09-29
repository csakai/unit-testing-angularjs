(function() {
    var app = angular.module('app');
    
    app.filter('backwards', function() {
        return function(input) {
            //This only works with UTF-8 strings. Since this is just a simple demo, we don't care about
            //complex characters.
            return input.toString()
                .split('')
                .reverse()
                .join('');
        };
    });
})(); 
