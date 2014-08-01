'use strict';

angular.module('siteApp')
    .controller('ProfileCtrl', function ($scope, user, $stateParams) {
        user.subscribe($scope);


    });
