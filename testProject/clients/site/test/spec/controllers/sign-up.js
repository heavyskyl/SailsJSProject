'use strict';

describe('Controller: SignUpCtrl', function () {

  // load the controller's module
  beforeEach(module('siteApp'));

  var SignUpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignUpCtrl = $controller('SignUpCtrl', {
      $scope: scope
    });
  }));

});
