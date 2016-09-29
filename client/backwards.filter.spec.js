describe('filter#backwards', function() {
    it('should reverse the input string', function() {
        var $filter;
        var backwardsFilter;
        var testStr = 'hello world';
        var expectedStr = 'dlrow olleh';

        module('app');

        inject(function($injector) {
            $filter = $injector.get('$filter');
            backwardsFilter = $filter('backwards');
        });

        expect(backwardsFilter(testStr)).toEqual(expectedStr);
    });
});
