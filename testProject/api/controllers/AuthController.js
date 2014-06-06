/**
 * AuthController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport'),
    bcrypt = require('bcrypt-nodejs/bCrypt.js');

module.exports = {

    'logout': function (req, res) {
        req.logout();
        res.json({
            success: true
        });
    },

    'logoutHttp': function (req, res) {
        req.logout();
        res.redirect('/');
    },

    'localSocket': function (req, res) {
        var username = req.body.displayName,
            password = req.body.password,
            isEmail;

        if (!username || !password) {
            return res.json({
                error: true,
                message: 'Incorrect display name or password'
            });
        }
        isEmail = username.indexOf('@') !== -1;

        User.findOne()
            .where({
                or: [
                    {
                        displayName: username,
                        provider: 'local'
                    },
                    {
                        email: username,
                        provider: 'local'
                    }
                ]
            })
            .done(function (error, user) {
                if (error) {
                    return res.json({
                        error: true,
                        errorInstance: error
                    });
                } else if (!user) {
                    return res.json({
                        error: true,
                        message: isEmail ? 'Incorrect email or password' : 'Incorrect display name or password'
                    });
                } else if (bcrypt.compareSync(password, user.encryptedPassword)) {
                    req.logIn(user, function (err) {
                        if (err) {
                            console.log('login local err');
                        }
                        console.log('success login local web socket');
                        return res.json({
                            error: false,
                            user: user
                        });
                    });

                }
            });
    },

    'local': function (req, res) {
        passport.authenticate('local', { failureRedirect: '/' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500', err);
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },

    // http://developer.github.com/v3/
    // http://developer.github.com/v3/oauth/#scopes
    'github': function (req, res) {
        passport.authenticate('github', { failureRedirect: '/' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AuthController)
     */
    _config: {}


};
