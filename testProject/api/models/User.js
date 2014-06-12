/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs/bCrypt.js');

module.exports = {

   schema: true,

   attributes: {

      provider: {
         type: 'string',
         defaultsTo: 'local'
      },

      /*
       default in beforeCreate = 100
       100 - user
       200 - moderator
       300 - admin
       400 - superadmin
       */
      role: {
         type: 'integer',
         defaultsTo: 100,
         in: [100, 200, 300, 400]
      },

      firstName: {
         type: 'string',
         //required : true,
         columnName: 'first_name'
      },

      lastName: {
         type: 'string',
         //required : true,
         columnName: 'last_name'
      },

      displayName: {
         type: 'string',
         required: true,
         columnName: 'display_name',
         minLength: 5
      },

      encryptedPassword: {
         type: 'string',
         columnName: 'encrypted_password'
      },

      email: {
         type: 'string',
         email: true,
         unique: true,
         defaultsTo: undefined
         //required : true
      },

      socialId: {
         columnName: 'social_id',
         defaultsTo: undefined
      },

      socialUrl: {
         columnName: 'social_url',
         defaultsTo: undefined
      },

      avatarUrl: {
         columnName: 'avatar_url',
         defaultsTo: 'http://rocketdock.com/images/screenshots/League-of-Legends-Ashe.png'
      },

      toJSON: function () {
         var object = this.toObject();

         delete object.encryptedPassword;

         return object;
      }

   },

   beforeValidation: function (attrs, next) {
      var errors = {};

      function goNext() {
         if (Object.getOwnPropertyNames(errors).length > 0) {
            next({
               BeforeValidationError : errors
            })
         } else {
            next();
         }
      }

      attrs.role = 100;
      if (attrs.provider === 'local') {
         if (!attrs.firstName) {
            errors.firstName = ['First name is required'];
         }

         if (!attrs.lastName) {
            errors.lastName = ['Last name is required'];
         }

         if (!attrs.displayName) {
            errors.displayName = ['Display name should be at least 5 characters'];
         } else {
            if (!(/^[a-zA-Z0-9_]*$/.test(attrs.displayName))) {
                errors.displayName = ['Password should have only letters, numbers and underscores'];
            }
         }

         if (attrs.password) {
            if (attrs.password.length < 6) {
               errors.password = ['Password should be at least 6 characters'];
            }

            if (attrs.password !== attrs.passwordConfirmation) {
               errors.passwordConfirmation = ['Passwords are not equal'];
            }
         } else {
            errors.password = ['Password should be at least 6 characters'];
         }

         if (!attrs.email) {
            errors.email = ['Email is not valid'];
         }

         attrs.encryptedPassword = bcrypt.hashSync(attrs.password);

         /**
          * check is email exist and is displayName exist;
          */
         if (attrs.email && attrs.displayName) {
            User.findOne({
               where : {
                  or : [
                     { email : attrs.email },
                     { displayName : attrs.displayName, provider : 'local' }
                  ]
               }
            }).done(function (err, user) {
               if (user) {

                  if (user.email === attrs.email) {
                     errors.email = ['Email "' + attrs.email + '" is already in use'];
                  }

                  if (user.displayName === attrs.displayName) {
                     errors.displayName = ['Display name "' + attrs.displayName + '" is already in use'];
                  }

               }

               goNext();
            });
         } else {
            goNext();
         }

      }

   }

};
