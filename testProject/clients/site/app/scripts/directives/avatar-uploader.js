'use strict';

angular.module('siteApp')
    .directive('avatarUploader', function () {
        return {
            templateUrl: 'views/avatar-uploader.html',
            restrict: 'E',
            scope: {
                maxSize: '@'
            },
            controller: function($scope) {
                window.$scope = $scope;
                $scope.error = {
                    status : false,
                    message : ''
                };

                $scope.supportedFileTypes = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

                $scope.isSupportedType = function(type) {
                    if ($scope.supportedFileTypes.indexOf(type) !== -1) {
                        return true;
                    }
                };

                $scope.image = {
                    display: false,
                    data: ''
                };

                $scope.cancel = function() {
                    $scope.image = {
                        display: false,
                        data: ''
                    };
                };

                $scope.setCoordinates = function(c) {
                    $scope.coordinates = {
                        w : c.w >= 200 ? c.w : 200,
                        h : c.h >= 200 ? c.h : 200,
                        x : c.x,
                        y : c.y,
                        x2 : c.x2,
                        y2 : c.y2
                    };
                };

                $scope.coordinates = {
                    w : 0,
                    h : 0,
                    x : 0,
                    y : 0,
                    x2 : 0,
                    y2 : 0
                };

                $scope.onImageLoad = function(e, el) {
                    $scope.imageSize = {
                        width : el.width(),
                        height : el.height()
                    };
                };

                $scope.onImageEditLoad = function(e, el) {
                    $scope.imageEditSize = {
                        width : el.width(),
                        height : el.height()
                    };
                };

                $scope.imageSize = {
                    width : 0,
                    height : 0
                };

                $scope.imageEditSize = {
                    width : 0,
                    height : 0
                };

                $scope.getPreviewStyle = function() {
                    var rx = 200 / $scope.coordinates.w,
                        ry = 200 / $scope.coordinates.h;

                    return {
                        width: Math.round(rx * 558) + 'px',
                        height: Math.round(ry * 414) + 'px',
                        marginLeft: '-' + Math.round(rx * $scope.coordinates.x) + 'px',
                        marginTop: '-' + Math.round(ry * $scope.coordinates.y) + 'px'
                    };
                };

                $scope.thumb = {
                    display : false,
                    data : ''
                };

                $scope.next = function() {

                    $scope.thumb = {
                        display : true,
                        data : $scope.canvas.toDataURL()
                    };
                };

                $scope.canvas = null;

            },
            link: function postLink(scope, element, attrs) {
                element.delegate('input', 'change', function() {
                    var file = this.files[0],
                        reader;

                    if (!file) return;

                    $(this).val('');

                    console.log(file, scope.maxSize);

                    if (file.size > parseInt(scope.maxSize, 10)) {
                        scope.error = {
                            status : true,
                            message : 'File "' + file.name + '" is too big'
                        }
                    } else {
                        if (scope.isSupportedType(file.type)) {
                            scope.error = {
                                status : false,
                                message : ''
                            };

                            reader = new FileReader();

                            reader.onload = function (e) {
                                scope.image = {
                                    display: true,
                                    data: e.target.result
                                };
                                scope.$apply();

                                element.find('.site-uploader-image.site-uploader-main-image').Jcrop({
                                    onChange: function(c) {
                                        element.find('.jcrop-holder > div').css({
                                            minWidth : '200px',
                                            minHeight : '200px'
                                        });

                                        scope.setCoordinates(c);

                                        var canvas = document.createElement('canvas');
                                        element.find('.site-uploader-profile-wrapper').html('').append(canvas);
                                        canvas.width = 200;
                                        canvas.height = 200;

                                        var context = canvas.getContext('2d');
                                        //context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                                        var image = new Image();
                                        image.src = $scope.image.data;

                                        var m = scope.imageSize.width / scope.imageEditSize.width;

                                        context.drawImage(image,
                                            scope.coordinates.x * m,
                                            scope.coordinates.y * m,
                                            scope.coordinates.w * m,
                                            scope.coordinates.h * m,
                                            0,
                                            0,
                                            200,
                                            200
                                        );

                                        $scope.canvas = canvas;

                                        scope.$apply();
                                    },
                                    //onSelect: showPreview,
                                    aspectRatio: 1
                                });
                            };

                            reader.readAsDataURL(file);


                        } else {
                            scope.error = {
                                status : true,
                                message : "We don't support this file format. Please choose an image in JPG, GIF or PNG."
                            };
                        }
                    }

                    scope.$apply();
                });
            }
        };
    });
