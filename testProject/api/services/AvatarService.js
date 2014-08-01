/**
 * Avatar Service - creates image files from data url
 *
 */
var fs = require('fs'),
    _ = require('lodash');

module.exports = {

    getFormat: function(data) {
        return data.substr(11, data.indexOf(';') - 11);
    },

    getBase64Data: function(data) {
        return data.substring(data.indexOf(';') + 7);
    },

    isSupportedFormat: function(format) {
        var supportedFileTypes = ['.jpg', '.jpeg', '.gif', '.png'];

        return (supportedFileTypes.indexOf(format) !== -1);
    },

    getTempFilePath: function() {
        return './assets/static/';
    },

    createImage: function (data, fileName, callback) {
        var format = '.' + this.getFormat(data),
            base64Data = this.getBase64Data(data),
            random = Math.floor((Math.random() * 100000000000) + 1),
            filePath = this.getTempFilePath() + fileName + random + format;

        if (!this.isSupportedFormat(format)) {
            callback(new Error('Format ' + format + ' is not supported'));
        }

        fs.writeFile(filePath, base64Data, 'base64', function(err) {
            if (err) {
                callback(err);
            } else {
                callback(err, fileName + random + format);
            }
        });
    },

    createImages: function (imagesData, callback) {
        var created = 0,
            keysLength = _.keys(imagesData).length,
            imagesPath = {};

        _.forEach(imagesData, function (val, key) {
            this.createImage(val, key, function(err, filePath) {
                if (err) {
                    callback(err);
                } else {
                    created++;
                    imagesPath[key] = filePath;
                    if (created === keysLength) {
                        callback(null, imagesPath);
                    }
                }
            });
        }.bind(this));
    },

    removeFile: function(file, cb) {
        fs.unlink(this.getTempFilePath() + file, cb);
    },

    removeFiles: function (files, cb) {
        var length = _.keys(files).length,
            i = 0;

        function onRemoveFile(err) {
            if (err) {
                cb(err);
                return;
            }
            i++;
            if (i === length - 1) {
                cb(null, files);
            }
        }

        _.forEach(files, function(val) {
            this.removeFile(val, onRemoveFile);
        }.bind(this));
    }

};