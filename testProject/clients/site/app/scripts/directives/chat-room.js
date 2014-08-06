'use strict';

angular.module('siteApp')
    .directive('chatRoom', function () {
        return {
            templateUrl: 'views/chat-room.html',
            restrict: 'E',
            controller: 'ChatRoomCtrl',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
