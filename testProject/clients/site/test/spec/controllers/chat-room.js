'use strict';

describe('Controller: ChatRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('siteApp'));

  var ChatRoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatRoomCtrl = $controller('ChatRoomCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
