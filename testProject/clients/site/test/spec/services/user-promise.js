'use strict';

describe('Service: UserPromise', function () {

  // load the service's module
  beforeEach(module('siteApp'));

  // instantiate service
  var UserPromise;
  beforeEach(inject(function (_UserPromise_) {
    UserPromise = _UserPromise_;
  }));

  it('should do something', function () {
    expect(!!UserPromise).toBe(true);
  });

});
