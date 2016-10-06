describe('appCtrl', function() {
    var appCtrl;
    var Items;
    var $rootScope;
    var $q;
    var fakeItems = [ 'foo', 'bar', 'baz' ];

    var ItemSrvcMock = {
        index: function() {}
    };

    var promise;
    var catchSpy;
    var thenSpy;

    beforeEach(module('app', function($provide) {
        $provide.value('Items', ItemSrvcMock);
    }));

    beforeEach(inject(function(_$q_, _$controller_, _$rootScope_, _Items_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        Items = _Items_;
        $controller = _$controller_;

        spyOn(Items, 'index').and.callFake(function() {
            return $q.resolve()
        });
    }));

    afterEach(function() {
        $rootScope.$digest();
    });

    describe('in general', function() {
        beforeEach(function() {
            appCtrl = $controller('appCtrl');
        });

        it('should fetch the items from the Items service', function() {
            expect(Items.index.calls.count()).toEqual(1);
        });
    });

    describe('index call is successful', function() {
        beforeEach(function() {
            Items.index.and.callFake(function() {
                return $q.resolve(fakeItems);
            });
            appCtrl = $controller('appCtrl');
        });
         
        it('should map add the items to the controller', function() {
            promise = Items.index.calls.first().returnValue;
            promise.finally(function() {
                expect(appCtrl.items).toEqual(fakeItems);
            });
        });
    });

    describe('index call fails', function() {
        beforeEach(function() {
            Items.index.and.callFake(function() {
                return $q.reject();
            });
            appCtrl = $controller('appCtrl');
            thenSpy = spyOn(Items.index.calls.first().returnValue, 'then').and.callThrough();
            catchSpy = spyOn(Items.index.calls.first().returnValue, 'catch').and.callThrough();
        });

        it('should not be handled', function() {
            promise = Items.index.calls.first().returnValue;
            promise.finally(function() {
                expect(thenSpy.calls.count()).toEqual(1);
                expect(catchSpy.calls.any()).toBe(false);
            });
        });
    });
});
