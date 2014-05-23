'use strict';

angular.module('adminApp')
    .controller('UsersCtrl', function ($scope, users, $filter, ngTableParams) {
        console.log(users);
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            filter: {
                displayName: ''       // initial filter
            }
        }, {
            total: users.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ?
                    $filter('filter')(users, params.filter()) :
                    data;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });

    });
