'use strict';

describe('Service: Csrf', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var Csrf;
  beforeEach(inject(function (_Csrf_) {
    Csrf = _Csrf_;
  }));

  it('should do something', function () {
    expect(!!Csrf).toBe(true);
  });

});
