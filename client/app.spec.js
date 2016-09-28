describe('app#constants', function() {
    describe('you could check at config, EVENTS', function() {
        it('should have a CLICK constant', function() {
            module('app', function(EVENTS) {
                expect(EVENTS.CLICK).toBeDefined();
                expect(EVENTS.CLICK).toBe('click');
            });
        });
    });
    describe('you could check after config too, EVENTS', function() {
        it('should have a CLICK constant', function() {
            module('app');
            inject(function($injector) {
                var EVENTS = $injector.get('EVENTS');
                expect(EVENTS.CLICK).toBeDefined();
                expect(EVENTS.CLICK).toBe('click');
            });
        });
    });
});
