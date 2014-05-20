'use strict';

angular.module('siteApp')
  .service('Session', function Session($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return $http.get('/session/user');
    });
