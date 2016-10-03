describe('app.items#config', function() {
    var APP_NAME = 'foobar';
    var HEADER_NAME = 'App-Name';
    var commonHeader = {};

    module.sharedInjector();

    beforeAll(module('app.items', function(_APP_NAME_) {
        APP_NAME = _APP_NAME_;
    }));

    beforeAll(inject(function($http) {
        commonHeader = $http.defaults.headers.common;
    }));

    it('should add the App-Name header to the $http service', function() {
        expect(commonHeader[HEADER_NAME]).toBeDefined();
    });

    it('should set the App-Name header for the $http to the APP_NAME constant', function() {
        expect(commonHeader[HEADER_NAME]).toBe(APP_NAME);
    });
});
