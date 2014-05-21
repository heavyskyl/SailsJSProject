'use strict';

angular.module('siteApp')
    .controller('SignUpCtrl', function ($scope, csrf) {
        $scope.csrf = csrf._csrf;
    });
