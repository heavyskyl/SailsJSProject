'use strict';

angular.module('siteApp')
    .controller('ProfileCtrl', function ($scope, user, $stateParams, userLoader) {

        $scope.loadUser = function () {
            $scope.userLoaderData = null;
            $scope.error = null;

            userLoader.byId($stateParams.userId)
                .then(function (data) {
                    $scope.userLoaderData = data;
                })
                .catch(function (data) {
                    $scope.error = data;
                });
        };

    });
