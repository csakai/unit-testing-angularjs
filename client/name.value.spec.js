describe('app#values', function() {
    describe('you can\'t check a value at config, name', function() {
        it('shouldn\'t be able to get value#name at config phase', function() {
            var createModuleFn = function() {
                module('app', function(name) {
                    expect(name).toEqual({
                        first: 'Chris',
                        last: 'Sakai'
                    });
                });
                inject();
            };
            expect(createModuleFn).toThrow();
        });
    });

    describe('value#name', function() {
        it('should have the right name data', function() {
            module('app');
            inject(function($injector) {
                var name = $injector.get('name');
                expect(name).toEqual({
                    first: 'Chris',
                    last: 'Sakai'
                });
            });
        });
    });
});
