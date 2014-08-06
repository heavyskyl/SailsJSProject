'use strict';

angular.module('siteApp')
    .factory('userLoader', function ($sails, userPromise, $q) {

        return {
            byId: function (id) {
                var deferred = $q.defer();

                userPromise.success(function (data) {
                    var user = data.user;

                    if (id === user.id) {
                        deferred.resolve({
                            myProfile: true,
                            user: user,
                            loadedUser: null
                        });
                    } else {
                        $sails.get('/user/' + id)
                            .success(function (data) {
                                deferred.resolve({
                                    myProfile: false,
                                    user: user,
                                    loadedUser: data
                                });
                            })
                            .error(function (data) {
                                deferred.reject({
                                    message: 'There is no user with this id',
                                    status: data.status
                                });
                            });
                    }
                });

                return deferred.promise;
            },

            all: function () {
                return $sails.get('/user');
            }
        };
    });
