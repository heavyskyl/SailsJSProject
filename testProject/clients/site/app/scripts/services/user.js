'use strict';

angular.module('siteApp')
    .factory('user', function ($sails) {
        // Service logic
        // ...

        var scopes = [],
            user;

        function fillScopes(user) {
            angular.forEach(scopes, function(scope) {
                scope.user = user;
            });
        }

        $sails.get('/session/user').success(function(data) {
            user = data.user;
            fillScopes(user);
        });

        return {
            subscribe : function(scope) {
                scopes.push(scope);
                scope.user = user ? user : {};
            },

            login : function(data) {
                user = data;
                fillScopes(data);
            }
        };
    });
