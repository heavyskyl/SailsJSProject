/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs/bCrypt.js');

module.exports = {

    schema : true,

    attributes: {

        provider : {
            type : 'string',
            defaultsTo : 'local'
        },

        /*
            default in beforeCreate = 100
            100 - user
            200 - moderator
            300 - admin
            400 - superadmin
        */
        role : {
            type : 'integer',
            defaultsTo : 100,
            in : [100, 200, 300, 400]
        },

        firstName : {
            type : 'string',
            //required : true,
            columnName: 'first_name'
        },

        lastName : {
            type : 'string',
            //required : true,
            columnName : 'last_name'
        },

        displayName : {
            type : 'string',
            required : true,
            columnName : 'display_name',
            minLength : 5
        },

        encryptedPassword : {
            type : 'string',
            columnName : 'encrypted_password'
        },

        email : {
            type : 'string',
            email : true,
            unique : true,
            defaultsTo : undefined
            //required : true
        },

        socialId : {
            columnName : 'social_id',
            defaultsTo : undefined
        },

        socialUrl : {
            columnName : 'social_url',
            defaultsTo : undefined
        },

        avatarUrl : {
            columnName : 'avatar_url',
            defaultsTo : 'http://rocketdock.com/images/screenshots/League-of-Legends-Ashe.png'
        },

        toJSON : function() {
            var object = this.toObject();

            delete object.encryptedPassword;

            return object;
        }

    },

    beforeCreate: function (attrs, next) {
        console.log('before create user');
        attrs.role = 100;
        if (attrs.provider === 'local') {
            if (!attrs.firstName) {
                return next({
                    err : 'First name is not specified'
                });
            }

            if (!attrs.lastName) {
                return next({
                    err : 'Last name is not specified'
                });
            }

            if (!attrs.displayName) {
                return next({
                    err : 'Display name is not specified'
                });
            }

            if (!attrs.email) {
                return next({
                    err : 'Email is not specified'
                });
            }

            if (attrs.password) {
                if (attrs.password.length < 6) {
                    return next({
                        err : 'Password length should be at least 8 characters'
                    });
                }

                if (attrs.password !== attrs.passwordConfirmation) {
                    return next({
                        err : 'Passwords are not equal'
                    });
                }
            }

            attrs.encryptedPassword = bcrypt.hashSync(attrs.password);
        }

        next();

    }

};
