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

                $scope.el = null;

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

                $scope.back = function() {
                    $scope.reload();
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

                    $scope.onChange($scope.coordinates);

                    $scope.thumb = {
                        display : true,
                        data : $scope.canvas.toDataURL()
                    };
                };

                $scope.canvas = null;

                $scope.onChange = function(c) {

                    $scope.coordinates = c;

                    var canvas = document.createElement('canvas');
                    $scope.el.find('.site-uploader-profile-wrapper').html('').append(canvas);
                    canvas.width = 200;
                    canvas.height = 200;

                    var context = canvas.getContext('2d');
                    var image = new Image();
                    image.src = $scope.image.data;

                    var m = $scope.imageSize.width / $scope.imageEditSize.width;

                    context.drawImage(image,
                        $scope.coordinates.x * m,
                        $scope.coordinates.y * m,
                        $scope.coordinates.w * m,
                        $scope.coordinates.h * m,
                        0,
                        0,
                        200,
                        200
                    );

                    $scope.canvas = canvas;
                };

                $scope.reload = function() {
                    $scope.error = {
                        status : false,
                        message : ''
                    };
                    $scope.image = {
                        display: false,
                        data: ''
                    };
                    $scope.thumb = {
                        display : false,
                        data : ''
                    };
                    if ($scope.mainJcrop) {
                        $scope.mainJcrop.destroy();
                    }
                };

                $scope.mainJcrop = null;

            },
            link: function postLink(scope, element, attrs) {
                scope.el = element;

                scope.$on('modal.hide', function(e) {
                    scope.reload();
                });

                element.delegate('input', 'change', function() {
                    var file = this.files[0],
                        reader;

                    if (!file) return;

                    $(this).val('');

                    if (file.size > parseInt(scope.maxSize, 10)) {
                        scope.error = {
                            status : true,
                            message : 'File "' + file.name + '" is too big'
                        };
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
                                    minSize : [200, 200],
                                    setSelect : [0, 0, 200, 200], //@TODO middle coordinates
                                    onChange: $scope.onChange,
                                    onSelect: $scope.onChange,
                                    aspectRatio: 1
                                }, function() {
                                    scope.mainJcrop = this;
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
