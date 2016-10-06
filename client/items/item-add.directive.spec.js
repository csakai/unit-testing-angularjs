describe('item-add', function() {
    var scope;
    var Items;
    var $controller;
    var AddCtrl;
    var ItemContainerMockMethods = [
        'addItem',
        'addFailed',
        'addSucceeded'
    ];

    var ItemServiceMock;

    function buildDirective(inject) {
        inject(function($compile, _$q_, $rootScope, _Items_) {
            $q = _$q_;
            Items = _Items_;
            scope = $rootScope.$new(true);
            var elem = Mocks.createFakeParentElement($compile, scope, {
                name: 'itemContainer',
                methods: ItemContainerMockMethods
            }, 'item-add');
            scope.$digest();
            scope = elem.isolateScope();
            AddCtrl = scope.AddCtrl;
            Items.add.and.callFake(function(item) {
                return $q(function(resolve, reject) {
                    resolve();
                });
            });
        });
    }

    function shouldDoNothing(Items, scope, AddCtrl) {
        var item = AddCtrl.item;
        var addingItem = AddCtrl.addingItem;
        var result = AddCtrl.addItem();
        expect(result).toBeUndefined();
        expect(AddCtrl.addingItem).toEqual(addingItem);
        expect(AddCtrl.item).toEqual(item);
        expect(Items.add.calls.any()).toBe(false);
        expect(scope.addItem.calls.any()).toBe(false);
        expect(scope.addFailed.calls.any()).toBe(false);
        expect(scope.addSucceeded.calls.any()).toBe(false);
    }
            
    beforeEach(module('templates', 'app.items', function($provide) {
        ItemServiceMock = jasmine.createSpyObj('ItemService', [
            'add'
        ]);
        $provide.value('Items', ItemServiceMock);
    }));

    afterEach(function() {
        scope.$digest();
    });
    
    describe('@controller', function() {
        beforeEach(function() {
            buildDirective(inject);
        });

        describe('addItem()', function() {
            describe('!itemForm.$valid', function() {
                beforeEach(function() {
                    AddCtrl.itemForm.$valid = false;
                });

                it('should do nothing', function() {
                    shouldDoNothing(Items, scope, AddCtrl);
                });
            });

            describe('addingItem', function() {
                beforeEach(function() {
                    AddCtrl.addingItem = true;
                });

                it('should do nothing', function() {
                    shouldDoNothing(Items, scope, AddCtrl);
                });
            });

            describe('itemForm.$valid && !addingItem', function() {
                beforeEach(function() {
                    AddCtrl.item = 'testdata';
                    AddCtrl.itemForm.$valid = true;
                    AddCtrl.addingItem = false;
                });

                it('should set item to a blank string', function() {
                    var item = AddCtrl.item;
                    AddCtrl.addItem();
                    expect(AddCtrl.item).not.toBe(item);
                    expect(AddCtrl.item).toBe('');
                });

                it('should call Items.add', function() {
                    var item = AddCtrl.item;
                    AddCtrl.addItem();
                    expect(Items.add.calls.count()).toEqual(1);
                    expect(Items.add.calls.first().args).toEqual([ item ]);
                });

                it('should use the container controller\'s addItem method', function() {
                    var item = AddCtrl.item;
                    AddCtrl.addItem();
                    expect(scope.addItem.calls.count()).toEqual(1);
                    expect(scope.addItem.calls.first().args).toEqual([ item ]);
                });

                it('should block further uses until the promise has resolved or rejected', function() {
                    var promise = AddCtrl.addItem();
                    var notifyCounter = scope.addItem.calls.count();
                    var addCounter = Items.add.calls.count();
                    AddCtrl.addItem();
                    expect(AddCtrl.addingItem).toBe(true);
                    expect(scope.addItem.calls.count()).toEqual(notifyCounter);
                    expect(Items.add.calls.count()).toEqual(addCounter);
                    promise.finally(function() {
                        expect(AddCtrl.addingItem).toBe(false);
                    });
                });

                describe('add is successful', function() {
                    it('should use the container controller\'s addSucceeded method', function() {
                        var item = AddCtrl.item;
                        var promise = AddCtrl.addItem();
                        promise.finally(function() {
                            expect(scope.addSucceeded.calls.count()).toEqual(1);
                            expect(scope.addSucceeded.calls.first().args).toEqual([ item ]);
                        });
                    });
                });

                describe('add fails', function() {
                    beforeEach(function() {
                        Items.add.and.callFake(function() {
                            return $q.reject();
                        });
                    });

                    it('should use the container controller\'s addFailed method', function() {
                        var item = AddCtrl.item;
                        var promise = AddCtrl.addItem();
                        promise.finally(function() {
                            expect(scope.addFailed.calls.count()).toEqual(1);
                            expect(scope.addFailed.calls.first().args).toEqual([ item ]);
                        });
                    });

                    it('should set item to the item that failed to be added', function() {
                        var item = AddCtrl.item;
                        var promise = AddCtrl.addItem();
                        promise.finally(function() {
                            expect(AddCtrl.item).toBe(item);
                        });
                    });
                });
            });
        });

        describe('#init', function() {
            it('should set AddCtrl.item to blank string', function() {
                expect(AddCtrl.item).toBe('');
            });
        });
    });

    describe('@link', function() {
        beforeEach(function() {
            spyOn(_, 'assign');
            buildDirective(inject);
        });

        it('should assign the container controller\'s methods to the scope', function() {
            expect(_.assign.calls.count()).toEqual(1);
            expect(_.assign.calls.first().args).toEqual([ scope, Mocks.spies.itemContainer ]);
        });

        it('should set AddCtrl.addingItem to false', function() {
            expect(AddCtrl.addingItem).toBe(false);
        });

        it('should set AddCtrl.item to blank string', function() {
            expect(AddCtrl.item).toBe('');
        });
    });
});
