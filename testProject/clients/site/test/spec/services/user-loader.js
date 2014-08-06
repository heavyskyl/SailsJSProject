'use strict';

describe('Service: userLoader', function () {

  // load the service's module
  beforeEach(module('siteApp'));

  // instantiate service
  var userLoader;
  beforeEach(inject(function (_userLoader_) {
    userLoader = _userLoader_;
  }));

  it('should do something', function () {
    expect(!!userLoader).toBe(true);
  });

});
