'use strict';

angular.module('siteApp')
    .controller('SignUpCtrl', function ($scope, csrf, $sails, $log, $state, user, notificationService) {

        var editedFields = {};

        function clearBeforeValidationError(field) {
            if (field && $scope.beforeValidationError && (field in $scope.beforeValidationError)) {
                delete $scope.beforeValidationError[field];
            } else {
                $scope.beforeValidationError = null;
            }
        }

        $scope.avatar = {};

        $scope.$on('avatar-picked', function (e, data) {
            $scope.avatar = data;
        });

        $scope.user = {};

        $scope.beforeValidationError = null;

        $scope.register = function () {
            $scope.user._csrf = csrf._csrf;

            $sails.get('/user/create', $scope.user).success(function (data) {
                console.log(data);
                if (data.error !== true) {
                    $scope.user = {};
                    user.login(data.user);
                    notificationService.success('Welcome ' + data.user.firstName + '<br /><a>Take a toor</a>');
                    $state.go('main.index');
                } else {

                    if ('BeforeValidationError' in data.errorInstance) {
                        $scope.beforeValidationError = data.errorInstance.BeforeValidationError;
                    } else {
                        /** @TODO show contact form in notification */
                        if ('ValidationError' in data.errorInstance) {
                            notificationService.error('Validation error occur. Please contact us.');
                        } else {
                            notificationService.error('Server error occur. Please contact us.');
                        }
                    }
                }
            }).error(function () {
                $log.log('error in creating user', arguments);
            });

        };

        $scope.isFieldEdited = function (field) {
            return field in editedFields;
        };

        $scope.setFieldEdited = function (field) {
            editedFields[field] = true;
            clearBeforeValidationError(field);
        };

        $scope.hasError = function (field) {
            return (!$scope.form[field].$valid && $scope.isFieldEdited(field)) ||
                ($scope.beforeValidationError && $scope.beforeValidationError[field]);
        };

        $scope.showError = function (field, validator) {
            var validatorError = validator ? $scope.form[field].$error[validator] : $scope.form[field].$error.required;

            return validatorError && $scope.isFieldEdited(field) &&
                (!$scope.beforeValidationError || !$scope.beforeValidationError[field]);
        };

        $scope.getBeforeValidationError = function (field) {
            return $scope.beforeValidationError && $scope.beforeValidationError[field] ?
                $scope.beforeValidationError[field].join(' ') : '';
        };

        $scope.showBeforeValidationError = function (field) {
            return $scope.beforeValidationError && $scope.beforeValidationError[field];
        };

        $scope.hasPasswordConfirmationError = function () {
            return ((!$scope.form.passwordConfirmation.$valid ||
                ($scope.user.passwordConfirmation !== $scope.user.password)) &&
                $scope.isFieldEdited('passwordConfirmation') ||
                ($scope.beforeValidationError && $scope.beforeValidationError.passwordConfirmation));
        };

        $scope.showPasswordsNotEqualError = function () {
            return $scope.isFieldEdited('passwordConfirmation') &&
                ($scope.user.passwordConfirmation !== $scope.user.password) && $scope.form.passwordConfirmation.$valid &&
                (!$scope.beforeValidationError || !$scope.beforeValidationError.passwordConfirmation);
        };

    });
