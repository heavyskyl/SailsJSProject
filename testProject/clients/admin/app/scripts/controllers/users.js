'use strict';

angular.module('adminApp')
    .controller('UsersCtrl', function ($scope, users, $filter, ngTableParams, userRoles, $modal, $sails, $http, csrf,
        $log) {

        $scope.showRoleModal = function(user) {
            var scope = $scope.$new(true),
                modal;

            scope.user = angular.copy(user);
            scope.userRoles = userRoles;

            scope.hide = function() {
                modal.hide();
            };

            scope.save = function() {
                $scope.save(scope.user);
                scope.hide();
            };

            modal = $modal({
                title: 'Assign role',
                contentTemplate: 'main.users.role.modal.html',
                animation: 'am-fade-and-scale',
                placement: 'center',
                scope: scope,
                show: true
            });
        };

        $scope.save = function(user) {
            user._csrf = csrf._csrf;
            $sails.put('/user/' + user.id, user).success(function(user) {
                $scope.updateUserLocally(user);
            }).error(function() {
                //@TODO show notification
                $log.log('error in saving user', arguments);
            });
        };

        $scope.updateUserLocally = function(user) {
            var i;

            for (i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].id === user.id) {
                    $scope.users[i] = user;
                    return true;
                }
            }

            return false;
        };

        $scope.userRoles = userRoles;

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
