/*

    LayoutService

    allow to add user scripts and styles from current controller to a page

 */

module.exports = {


    getScripts : function(jsFiles) {
        var scriptsHTML = '';

        jsFiles.forEach(function(url) {
            scriptsHTML += '<script type="text/javascript" src="' + url + '" ></script>';
        });

        return scriptsHTML;
    },

    getStyles : function(cssFiles) {
        var stylesHTML = '';

        cssFiles.forEach(function(url) {
            stylesHTML += '<link rel="stylesheet" href="' + url + '" />';
        });

        return stylesHTML;
    }

};