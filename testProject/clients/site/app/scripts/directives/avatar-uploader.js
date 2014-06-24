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

                $scope.profileCoordinates = {
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

                $scope.drop = function(e) {
                    var dt = e.originalEvent.dataTransfer,
                        files = dt.files,
                        file = files[0];

                    $scope.handleFile(file);
                    $scope.dragIn.status = false;
                    $scope.$apply();
                };

                $scope.dragenter = function(e) {
                    $scope.dragIn.status = true;
                    $scope.$apply();
                };

                $scope.dragleave = function(e) {
                    $scope.dragIn.status = false;
                    $scope.$apply();
                };

                $scope.dragIn = {
                    status : false
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

                $scope.canNext = function() {
                    var c = $scope.coordinates;

                    return ((c.x !== c.x2) && (c.y !== c.y2));
                };

                $scope.canSave = function() {
                    var c = $scope.profileCoordinates;

                    return ((c.x !== c.x2) && (c.y !== c.y2));
                };

                $scope.next = function() {

                    $scope.el.find('.site-uploader-profile-image').attr('src', '');

                    $scope.onChange($scope.coordinates);

                    $scope.thumb = {
                        display : true,
                        data : $scope.canvas.toDataURL()
                    };
                };

                $scope.profileJcrop = null;

                $scope.onChangeProfileImage = function(c) {

                    $scope.profileCoordinates = c;

                    var canvas = document.createElement('canvas');
                    $scope.el.find('.site-uploader-profile-thumb-wrapper').html('').append(canvas);
                    canvas.width = 60;
                    canvas.height = 60;
                    canvas.setAttribute('class', 'img-circle');

                    var context = canvas.getContext('2d');
                    var image = new Image();
                    image.src = $scope.thumb.data;

                    context.drawImage(image,
                        $scope.profileCoordinates.x,
                        $scope.profileCoordinates.y,
                        $scope.profileCoordinates.w,
                        $scope.profileCoordinates.h,
                        0,
                        0,
                        60,
                        60
                    );

                    $scope.canvas = canvas;

                    if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                        $scope.$apply();
                    }
                };

                $scope.initProfileImageJcrop = function() {
                    $scope.el.find('.site-uploader-profile-image').Jcrop({
                        minSize : [60, 60],
                        setSelect : [0, 0, 60, 60], //@TODO middle coordinates
                        onChange: $scope.onChangeProfileImage,
                        onSelect: $scope.onChangeProfileImage,
                        aspectRatio: 1
                    }, function() {
                        $scope.profileJcrop = this;
                    });
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

                    if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                        $scope.$apply();
                    }
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

                $scope.backFromProfile = function() {
                    $scope.thumb = {
                        display : false,
                        data : ''
                    };

                    if ($scope.profileJcrop) {
                        $scope.profileJcrop.destroy();
                    }
                };

                $scope.handleFile = function(file) {
                    var reader;

                    if (!file) return;

                    $(this).val('');

                    if (file.size > parseInt($scope.maxSize, 10)) {
                        $scope.error = {
                            status : true,
                            message : 'File "' + file.name + '" is too big'
                        };
                    } else {
                        if ($scope.isSupportedType(file.type)) {
                            $scope.error = {
                                status : false,
                                message : ''
                            };

                            reader = new FileReader();

                            reader.onload = function (e) {
                                $scope.image = {
                                    display: true,
                                    data: e.target.result
                                };
                                $scope.$apply();

                                $scope.el.find('.site-uploader-image.site-uploader-main-image').Jcrop({
                                    minSize : [200, 200],
                                    setSelect : [0, 0, 200, 200], //@TODO middle coordinates
                                    onChange: $scope.onChange,
                                    onSelect: $scope.onChange,
                                    aspectRatio: 1
                                }, function() {
                                    $scope.mainJcrop = this;
                                });

                            };

                            reader.readAsDataURL(file);


                        } else {
                            $scope.error = {
                                status : true,
                                message : "We don't support this file format. Please choose an image in JPG, GIF or PNG."
                            };
                        }
                    }

                    $scope.$apply();
                }

            },
            link: function postLink(scope, element, attrs) {
                scope.el = element;

                scope.$on('modal.hide', function(e) {
                    scope.reload();
                });

                element.delegate('input', 'change', function() {
                    var file = this.files[0];

                    $scope.handleFile(file);
                });
            }
        };
    });
