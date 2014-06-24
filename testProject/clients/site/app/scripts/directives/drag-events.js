'use strict';

angular.module('siteApp')
    .directive('dragEvents', function () {
        return {
            restrict: 'A',
            scope: {
                dragenter: '&',
                dragleave: '&',
                drop: '&'
            },
            link: function postLink(scope, element) {
                var ondragenter = scope.dragenter(),
                    ondragleave = scope.dragleave(),
                    ondrop = scope.drop();

                element.on('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                if (ondragenter) {
                    element.on('dragenter', function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        ondragenter(e);
                    });
                }

                if (ondragleave) {
                    element.on('dragleave', function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        ondragleave(e);
                    });
                }

                if (ondrop) {
                    element.on('drop', function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        ondrop(e);
                    });
                }
            }
        };
    });
