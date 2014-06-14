'use strict';

angular.module('siteApp')
    .directive('onimageload', function () {
        return {
            restrict: 'A',
            scope: {
                onLoadCallback: '&'
            },
            link: function (scope, element, attrs) {
                element.on('load', function (e) {
                    scope.onLoadCallback()(e, element);
                });
            }
        };
    });
