'use strict';

angular.module('siteApp')
    .factory('user', function ($sails, $state, userPromise) {
        var scopes = [],
            user;

        function fillScopes(user) {
            angular.forEach(scopes, function (scope) {
                scope.user = user;
            });
        }

        userPromise.success(function (data) {
            user = data.user;
            fillScopes(user);
        });

        return {
            subscribe: function (scope) {
                scopes.push(scope);
                scope.user = user ? user : {};
            },

            login: function (data) {
                user = data;
                fillScopes(data);
            },

            logout: function () {
                $sails.get('/auth/logout').success(function (data) {
                    if (data.success) {
                        user = null;
                        fillScopes(user);
                    }
                    $state.go('main.index');
                });
            }
        };
    });
