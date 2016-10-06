describe('item-container', function() {
    var scope;
    var ContainerCtrl;
    var item = 'foobar';
    var ITEM_ADDED = 'ITEM_ADDED';
    var ITEM_ADD_FAILED = 'ITEM_ADD_FAILED';
    var ITEM_ADD_SUCCEEDED = 'ITEM_ADD_SUCCEEDED';

    beforeEach(module('app.items', 'app.items.directives.mocks'));

    beforeEach(inject(function($compile, _$rootScope_) {
        scope = _$rootScope_.$new(true);
        var element = Mocks.createDirective($compile, scope, 'item-container');
        scope.$digest();
        scope = element.isolateScope();
        spyOn(scope, '$broadcast');
        ContainerCtrl = element.children().children().isolateScope().ContainerCtrl;
    }));

    it('should be okay', function() {
        expect(true).toBe(true);
    });
    describe('#props', function() {
        it('should have ITEM_ADDED', function() {
            expect(ContainerCtrl.ITEM_ADDED).toBe('ITEM_ADDED');
        });

        it('should have ITEM_ADD_SUCCEEDED', function() {
            expect(ContainerCtrl.ITEM_ADD_SUCCEEDED).toBe('ITEM_ADD_SUCCEEDED');
        });

        it('should have ITEM_ADD_FAILED', function() {
            expect(ContainerCtrl.ITEM_ADD_FAILED).toBe(ITEM_ADD_FAILED);
        });
    });

    describe('addItem()', function() {
        it('should broadcast ITEM_ADDED', function() {
            ContainerCtrl.addItem(item);
            expect(scope.$broadcast.calls.count()).toEqual(1);
            expect(scope.$broadcast.calls.first().args).toEqual([ ITEM_ADDED, item ]);
        });
    });

    describe('addFailed()', function() {
        it('should broadcast ITEM_ADD_FAILED', function() {
            ContainerCtrl.addFailed(item);
            expect(scope.$broadcast.calls.count()).toEqual(1);
            expect(scope.$broadcast.calls.first().args).toEqual([ ITEM_ADD_FAILED, item ]);
        });
    });

    describe('addSucceeded()', function() {
        it('should broadcast ITEM_ADD_SUCCEEDED', function() {
            ContainerCtrl.addSucceeded(item);
            expect(scope.$broadcast.calls.count()).toEqual(1);
            expect(scope.$broadcast.calls.first().args).toEqual([ ITEM_ADD_SUCCEEDED, item ]);
        });
    });
});
