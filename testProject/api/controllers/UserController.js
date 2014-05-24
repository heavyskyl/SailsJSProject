/**
 * UserController
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

function getRole(role) {
    switch(role) {
        case 100 :
            return 'user';
            break;
        case 200 :
            return 'moderator';
            break;
        case 300 :
            return 'admin';
            break;
        case 400 :
            return 'super-admin';
            break;
        default :
            return 'Unknown Role ' + role;
            break;
    }
}

module.exports = {

    'setRole' : function(req, res, next) {
        var params = req.params.all();

        User.update({
            id : params.userId
        },{
            role : parseInt(params.role, 10)
        }, function(err, users) {
            var user;

            if (err) {
                return res.json({
                    error : true,
                    errorInstance : err
                })
            } else {
                user = users[0];

                user.role = getRole(user.role);

                res.json({
                    error : false,
                    success : true,
                    user : user
                });
            }
        });


    },

    'roleDialogTpl' : function(req, res, next) {
        User.findOne({ _id : req.params.id}, function(err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({
                user : user,
                roles : {
                    'user' : 100,
                    'moderator' : 200,
                    'admin' : 300,
                    'super-admin' : 400
                },
                layout: null
            });
        });
    },

    'new' : function (req, res) {
        res.view();
    },

    'create' : function(req, res, next) {
        User.create(req.params.all(), function(err, user) {
            if (err) {

                req.session.flash = {
                    err : err
                }

                return res.redirect("/user/new");
            }

            res.json(user);
            req.session.flash = {};

            req.logIn(user, function (err) {
                if (err) {
                    res.view('500', err);
                    return;
                }

                res.redirect("/user/profile/" + user.id);
                return;
            });

            //return res.redirect("/user/profile/" + user.id);
        });
    },

    'profile' : function(req, res, next) {
        User.findOne({ _id : req.params.id}, function(err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({
                user : user
            });
        });
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}


};
