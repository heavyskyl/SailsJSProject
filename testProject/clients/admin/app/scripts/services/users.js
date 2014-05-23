'use strict';

angular.module('adminApp')
    .service('Users', function Users($sails) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        return $sails.get('/user');
    });
