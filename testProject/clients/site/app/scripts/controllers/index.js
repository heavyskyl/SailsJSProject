'use strict';

angular.module('siteApp')
  .controller('IndexCtrl', function ($scope, $sails, $http, csrf) {

        $scope.messages = [];

        $scope.message = '';

        $scope.sendMessage = function() {
            /*$sails.post('message', { text : $scope.message }).success(function(data) {
                console.log('post message', data);
                //$sails.messages.push(data);
            });*/
            $sails.post('/message', {
                text : $scope.message,
                _csrf : csrf._csrf
            }).success(function(data) {
                console.log('post message', data);
                //$scope.messages.push(data);
            }).error(function(data) {
                console.log('error', data);
            });
            $scope.message = '';
        }

        $sails.on('message', function (message) {
            console.info('message', message);
            $scope.messages.push(message.data);
        });

        $sails.get('/message/subscribe').success(function(data) {
            console.log('messages', data);
            $scope.messages = data;
        });


  });
