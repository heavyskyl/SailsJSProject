'use strict';

angular.module('adminApp')
    .factory('userRoles', function () {
        // Service logic
        // ...

        var roles = [
            {
                role : 100,
                title : 'user'
            },
            {
                role : 200,
                title : 'moderator'
            },
            {
                role : 300,
                title : 'admin'
            },
            {
                role : 400,
                title : 'super-admin'
            }
        ];

        // Public API here
        return {

            getRole : function(role) {
                var i;

                for (i = 0; i < roles.length; i++) {
                    if (roles[i].role === role) {
                        return roles[i].title;
                    }
                }

                return 'Unknown role ' + role;
            },

            getRoles : function() {
                return roles;
            }

        };
    });
