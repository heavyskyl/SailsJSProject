'use strict';

describe('Directive: avatarUploader', function () {

  // load the directive's module
  beforeEach(module('siteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<avatar-uploader></avatar-uploader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the avatarUploader directive');
  }));
});
