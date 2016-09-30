describe('app.items#constants', function() {
    describe('APP_NAME', function() {
        it('should be Unit Testing AngularJS', function() {
            module('app.items', function(APP_NAME) {
                expect(APP_NAME).toBe('Unit Testing AngularJS');
            });
            inject();
        });
    });
});

