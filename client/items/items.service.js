(function() {
    var app = angular.module('app.items');
    app.service('Items', function($http) {
        var GET = 'GET',
            PUT = 'PUT',
            ITEMS_URL = '/api/items';
        this.ITEMS_URL = ITEMS_URL;
        function _makeReq(action, body) {
            return $http({
                url: ITEMS_URL,
                method: action,
                data: body
            }).then(function(response) {
                return response.data;
            });
        }

        this.index = function index() {
            return _makeReq(GET);
        };

        this.add = function add(item) {
            return _makeReq(PUT, {
                item: item
            });
        };
    });
})();

