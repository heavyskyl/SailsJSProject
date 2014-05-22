'use strict';

angular.module('adminApp')
    .service('Session', function Session($sails) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        return $sails.get('/session/user');
    });
