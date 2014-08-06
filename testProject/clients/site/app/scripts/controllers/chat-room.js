'use strict';

angular.module('siteApp')
    .controller('ChatRoomCtrl', function ($scope, $sails, Csrf, $stateParams) {

        var csrf;

        Csrf.then(function (data) {
            csrf = data;
        });

        $scope.messages = [];

        $scope.message = '';

        $scope.sendMessage = function () {
            $sails.post('/message', {
                text: $scope.message,
                _csrf: csrf._csrf
            }).success(function (data) {
                    console.log('post message', data);
                    //$scope.messages.push(data);
                }).error(function (data) {
                    console.log('error', data);
                });
            $scope.message = '';
        };

        $sails.on('message', function (message) {
            console.info('message', message);
            $scope.messages.push(message.data);
        });

        $sails.get('/message/subscribe/' + $stateParams.userId).success(function (data) {
            console.log('messages', data);
            $scope.messages = data;
        });
    });
