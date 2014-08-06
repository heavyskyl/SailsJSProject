'use strict';

angular.module('siteApp')
    .directive('serverError', function () {
        var titleMap = {
            '404' : 'Not found'
        };

        return {
            templateUrl: 'views/server-error.html',
            restrict: 'E',
            scope: {
                error : '='
            },
            link: function postLink(scope, element, attrs) {
                scope.title = titleMap[scope.error.status];
            }
        };
    });
