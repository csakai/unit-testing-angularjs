describe('ItemsService', function() {
    var ItemsService,
        ITEMS_API = '/api/items',
        $http,
        $httpBackend,
        requestHandler,
        fakeItems = [ 'foo', 'bar', 'baz' ],
        newItem = 'bang',
        itemsArr;
    var spyMustBeCalled,
        spyMustNotBeCalled;
    
    function flushAndVerify($httpBackend) {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }

    beforeEach(module('app.items', function($provide) {
        $provide.decorator('$http', function($delegate) {
            var httpContainer = {
                '$http': $delegate
            };
            spyOn(httpContainer, '$http').and.callThrough();
            return httpContainer.$http;
        });
    }));
    beforeEach(inject(function(_$http_, _$httpBackend_, Items) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        ItemsService = Items;
        spyMustBeCalled = jasmine.createSpy('mustBeCalled');
        spyMustNotBeCalled = jasmine.createSpy('mustNotBeCalled');
    }));

    afterEach(function() {
        expect(spyMustNotBeCalled.calls.any()).toBe(false);
        requestHandler = undefined;
    });

    describe('index()', function() {
        beforeEach(function() {
            requestHandler = $httpBackend.expectGET(ITEMS_API);
            requestHandler.respond(200, fakeItems);
        });
        afterEach(function() {
            flushAndVerify($httpBackend);
        });
        
        it('should call $http', function() {
            ItemsService.index()
                .finally(function() {
                    expect($http.calls.count()).toEqual(1);
                    expect($http.calls.first().args.length).toEqual(1);
                    expect($http.calls.first().args[0]).toEqual({
                        url: ITEMS_API,
                        method: 'GET',
                        data: undefined
                    });
                });
        });
        describe('if server is working', function() {
            it('should return items array', function() {
                ItemsService.index()
                    .then(function(result) {
                        expect(result).toEqual(fakeItems);
                        spyMustBeCalled();
                    })
                    .catch(spyMustNotBeCalled)
                    .finally(function() {
                        expect(spyMustBeCalled.calls.count()).toEqual(1);
                    });
            });
        });

        describe('if server is not working', function() {
            beforeEach(function() {
                requestHandler.respond(500);
            });

            it('should throw', function() {
                ItemsService.index()
                    .then(spyMustNotBeCalled)
                    .catch(spyMustBeCalled)
                    .finally(function() {
                        expect(spyMustBeCalled.calls.count()).toEqual(1);
                        expect(spyMustBeCalled.calls.first().args).toEqual([
                            $http.calls.first().returnValue.$$state.value
                        ]);
                    });
            });
        });
    });

    describe('add()', function() {
        beforeEach(function() {
            requestHandler = $httpBackend.expectPUT(ITEMS_API, {
                item: newItem
            });
            requestHandler.respond(201);
        });
        afterEach(function() {
            flushAndVerify($httpBackend);
        });

        it('should call $http', function() {
            ItemsService.add(newItem)
                .finally(function() {
                    expect($http.calls.count()).toEqual(1);
                    expect($http.calls.first().args.length).toEqual(1);
                    expect($http.calls.first().args[0]).toEqual({
                        url: ITEMS_API,
                        method: 'PUT',
                        data: {
                            item: newItem
                        }
                    });
                });
        });
        describe('if server is working', function() {
            it('should return nothing', function() {
                ItemsService.add(newItem)
                    .then(function(data) {
                        expect(data).toBeUndefined();
                        spyMustBeCalled();
                    })
                    .catch(spyMustNotBeCalled)
                    .finally(function() {
                        expect(spyMustBeCalled.calls.count()).toEqual(1);
                    });
            });
        });

        describe('if the server is not working', function() {
            beforeEach(function() {
                requestHandler.respond(500);
            });

            it('should throw', function() {
                ItemsService.add(newItem)
                    .then(spyMustNotBeCalled)
                    .catch(spyMustBeCalled)
                    .finally(function() {
                        expect(spyMustBeCalled.calls.count()).toEqual(1);
                        expect(spyMustBeCalled.calls.first().args).toEqual([
                            $http.calls.first().returnValue.$$state.value
                        ]);
                    });
            });
        });
    });
});
