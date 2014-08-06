'use strict';

describe('Controller: OtherProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('siteApp'));

  var OtherProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtherProfileCtrl = $controller('OtherProfileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
