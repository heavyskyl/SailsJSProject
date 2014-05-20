'use strict';

angular
  .module('siteApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngSails',
    'ui.router'
  ])
    .config(function ($sailsProvider , $urlRouterProvider, $stateProvider) {

        if (window.location.port === '9000') {
            $sailsProvider.url = window.location.origin.replace('9000', '1337');
        }
        
        $urlRouterProvider.otherwise('index');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    session : 'Session'
                }
            })
            .state('main.index', {
                url: 'index',
                templateUrl : "views/main.index.html"
            })
            .state('main.signup', {
                url: 'signup',
                templateUrl : 'views/main.signup.html',
                controller: 'SignUpCtrl'
            });

    }).run(function($sails, $http) {

        $sails.on('message', function (message) {
            console.info('message', message);
        });

        $sails.get('/message/subscribe').success(function(data) {
            console.log('success', data);
        }).error(function(data){
            console.log('error', data);
        });

        $sails.get('/csrfToken', function(data) {
            console.log("csrf", data);
        });

    });
