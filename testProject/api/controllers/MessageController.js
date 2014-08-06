/**
 * MessageController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
    
  
    /**
    * Action blueprints:
    *    `/chat/subscribe`
    */

    subscribe: function (req, res) {
        var userId = req.param('userId');

        console.log('userId: ' + userId);

        Message.find(function(err, messages) {
            if (err) {
                throw err;
            }

            Message.subscribe(req.socket, userId);
            //Message.subscribe(req.socket, messages);

            res.send(messages);
        });
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to MessageController)
    */
    _config: {}

  
};
