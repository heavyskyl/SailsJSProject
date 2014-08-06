'use strict';

angular.module('siteApp')
    .controller('MyProfileCtrl', function ($scope) {

        $scope.user = $scope.userLoaderData ? $scope.userLoaderData.user : null;

    });
