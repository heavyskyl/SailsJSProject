'use strict';

angular.module('siteApp')
    .factory('userPromise', function ($sails) {
        return $sails.get('/session/user');
    });
