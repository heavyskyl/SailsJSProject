'use strict';

describe('Service: Csrf', function () {

  // load the service's module
  beforeEach(module('siteApp'));

  // instantiate service
  var Csrf;
  beforeEach(inject(function (_Csrf_) {
    Csrf = _Csrf_;
  }));

});
