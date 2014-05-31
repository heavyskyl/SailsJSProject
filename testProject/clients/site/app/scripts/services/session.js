'use strict';

angular.module('siteApp')
   .service('Session', function Session($sails) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      return $sails.get('/session/user');
   });
