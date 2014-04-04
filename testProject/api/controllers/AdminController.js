/**
 * AdminController
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

    /**
     * Action blueprints:
     *    `/admin/users`
     */
    users: function (req, res) {

        User.find().done(function (err, users) {
            if (err) return next(err);

            res.view({
                _layoutFile: '../adminlayout.ejs',
                users : users,
                usersCount : users.length,
                getRole: getRole
            });
        });

    },

    dashboard : function(req, res) {

        User.count().done(function (err, count) {
            if (err) return next(err);

            res.view({
                _layoutFile: '../adminlayout.ejs',
                usersCount: count,
                getRole: getRole
            });
        });

    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to AdminController)
     */
    _config: {}


};
