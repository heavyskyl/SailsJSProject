'use strict';

angular
    .module('adminApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngSails',
        'ui.router',
        'ngTable'
    ])
    .config(function ($sailsProvider , $urlRouterProvider, $stateProvider) {
        if (window.location.port === '9000') {
            $sailsProvider.url = window.location.origin.replace('9000', '1337');
        }

        $urlRouterProvider.otherwise('dashboard');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    session : 'Session',
                    csrf : 'Csrf'
                }
            })
            .state('main.dashboard', {
                url: 'dashboard',
                templateUrl : "views/main.dashboard.html",
                controller: 'DashboardCtrl'
            })
            .state('main.users', {
                url: 'users',
                templateUrl : "views/main.users.html",
                controller: 'UsersCtrl',
                resolve: {
                    users : 'Users'
                }
            });

    }).run(function() {

    });