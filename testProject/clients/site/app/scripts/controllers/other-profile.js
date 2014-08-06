'use strict';

angular.module('siteApp')
    .controller('OtherProfileCtrl', function ($scope) {

        $scope.user = $scope.userLoaderData ? $scope.userLoaderData.loadedUser : null;

    });
