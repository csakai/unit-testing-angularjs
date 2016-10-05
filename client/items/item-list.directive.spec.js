describe('item-list', function() {
    var $log;
    var scope;
    var itemContainerMockMethods = [
        'addItem',
        'addFailed',
        'addSucceeded'
    ];
    var itemContainerMockProps = {
        ITEM_ADDED: 'ITEM_ADDED',
        ITEM_ADD_SUCCEEDED: 'ITEM_ADD_SUCCEEDED',
        ITEM_ADD_FAILED: 'ITEM_ADD_FAILED'
    };
    var fakeItems = [ 'foo', 'bar', 'baz' ];

    beforeEach(module('templates', 'app.items'));

    beforeEach(inject(function($compile, _$log_, $rootScope) {
        $log = _$log_;
        scope = $rootScope.$new(true);
        scope.items = angular.copy(fakeItems);
        var elem = Mocks.createFakeParentElement($compile, scope, {
            name: 'itemContainer',
            methods: itemContainerMockMethods,
            props: itemContainerMockProps
        }, 'item-list', {
            items: 'items'
        });
        scope.$digest();
        elem = elem.find('item-list');
    }));

    afterEach(function() {
        scope.$digest();
    });

    describe('on ITEM_ADDED', function() {
        beforeEach(function() {
            scope.$broadcast(itemContainerMockProps.ITEM_ADDED, 'bang');
        });

        it('should add item on ITEM_ADDED', function() {
            expect(scope.items).toEqual(fakeItems.concat('bang'));
        });
    });
    
    describe('on ITEM_ADD_FAILED', function() {
        beforeEach(function() {
            scope.$broadcast(itemContainerMockProps.ITEM_ADD_FAILED, _.last(fakeItems));
        });

        it('should remove the last item', function() {
            var matchArray = angular.copy(fakeItems);
            matchArray.pop();
            expect(scope.items).toEqual(matchArray);
        });

        it('should log it to the console as info', function() {
            expect($log.info.logs[0]).toEqual([ itemContainerMockProps.ITEM_ADD_FAILED, ': ', _.last(fakeItems) ]);
        });
    });

    describe('on ITEM_ADD_SUCCEEDED', function() {
        beforeEach(function() {
            scope.$broadcast(itemContainerMockProps.ITEM_ADD_SUCCEEDED, _.last(fakeItems));
        });

        it('should log it to the console as info', function() {
            expect($log.info.logs[0]).toEqual([ itemContainerMockProps.ITEM_ADD_SUCCEEDED, ': ', _.last(fakeItems) ]);
        });
    });
});
