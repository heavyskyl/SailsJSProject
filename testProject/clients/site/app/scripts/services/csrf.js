'use strict';

angular.module('siteApp')
   .service('Csrf', function Csrf($sails) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      return $sails.get('/csrfToken');
   });
