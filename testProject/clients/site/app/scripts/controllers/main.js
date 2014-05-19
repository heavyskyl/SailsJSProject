'use strict';

angular.module('siteApp')
  .controller('MainCtrl', function ($scope, $state) {

     $state.go('main.index');

  });
