/*

    LayoutService

    allow to add user scripts and styles from current controller to a page

 */

module.exports = {

    getStyles : function(controller, action) {
        var stylesHTML = '',
            settings,
            cssFiles;

        if (!controller) return '';

        settings = require('../settings/' + controller + '.js');
        cssFiles = settings.styles.main;

        if (action && (action in settings.styles)) {
            cssFiles = cssFiles.concat(settings.styles[action]);
        }

        cssFiles.forEach(function(url) {
            stylesHTML += '<link rel="stylesheet" href="' + url + '" />';
        });

        return stylesHTML;
    },

    getScripts : function(controller, action) {
        var scriptsHTML = '',
            settings,
            jsFiles;

        if (!controller) return '';

        settings = require('../settings/' + controller + '.js');
        jsFiles = settings.scripts.main;

        if (action && (action in settings.scripts)) {
            jsFiles = jsFiles.concat(settings.scripts[action]);
        }

        jsFiles.forEach(function(url) {
            scriptsHTML += '<script type="text/javascript" src="' + url + '" ></script>';
        });

        return scriptsHTML;
    }

};