beforeEach(function() {
    function _createElement(name, attr) {
        var start = '<' + name;
        var end = '</' + name + '>';
        if (attr) {
            start += attr;
        }
        start += '>';
        return start + end;
    }

    function _createElementWithScope(elem, scope) {
        var attrStr = '';
        _.forEach(scope, function(val, key) {
            attrStr += ' ' + key + '="' + val + '"';
        });
        return _createElement(elem, attrStr);
    }

    function _createParentChildStr(parent, child, childScope) {
        var start = '<div>';
        var end = '</div>';
        child = _createElementWithScope(child, childScope);
        return start+child+end;
    }

    function _createFakeParentData(name) {
        return '$' + name + 'Controller';
    }
    window.Mocks = {
        createDirective: function($compile, scope, directiveName) {
            var elem = _createElement(directiveName);
            elem = angular.element(elem);
            elem = $compile(elem)(scope);
            return elem;
        },
        createFakeParentElement: function($compile, scope, parentObj, childName, childScope) {
            var parentCtrlMock = {};
            var element;
            if (parentObj.methods) {
                parentCtrlMock = jasmine.createSpyObj(parentObj.name, parentObj.methods);
                this.spies[parentObj.name] = parentCtrlMock;
            }
            parentObj.props && _.assign(parentCtrlMock, parentObj.props);
            element = _createParentChildStr(parentObj.name, childName, childScope);
            element = angular.element(element);
            element = $compile(element)(scope);
            element.data(_createFakeParentData(parentObj.name), parentCtrlMock);
            element = element.find(childName);
            return element;
        },
        spies: {}
    };
});
