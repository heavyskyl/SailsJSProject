'use strict';

describe('Directive: dragEvents', function () {

  // load the directive's module
  beforeEach(module('siteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<drag-events></drag-events>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dragEvents directive');
  }));
});
