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
module.exports = {

    'create' : function(req, res, next) {
        User.create(req.params.all(), function(err, user) {
            if (err) {
                return res.json({
                    error : true,
                    errorInstance : err
                });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return res.json({
                        error : true,
                        errors : err
                    });
                }

                return res.json({
                    error : false,
                    user : user
                });
            });
        });
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}


};
