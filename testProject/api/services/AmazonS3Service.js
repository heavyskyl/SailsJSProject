var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    amazonS3 = require('awssum-amazon-s3'),
    amazonS3conf = require('../../config/amazons3'),
    s3 = new amazonS3.S3({
        'accessKeyId': amazonS3conf.accessKeyId,
        'secretAccessKey': amazonS3conf.secretAccessKey,
        'region': amazonS3[amazonS3conf.region]
    }),
    imageTypes = ['jpg', 'jpeg', 'gif', 'png'];

function addImageContentType(filename, options) {
    var index = filename.lastIndexOf('.') + 1,
        format = filename.substr(index);

    if (imageTypes.indexOf(format) !== -1) {
        options.ContentType = 'image/' + format;
    }
}

module.exports = {

    putObject: function (filepath, filename, cb) {
        // you must run fs.stat to get the file size for the content-length header (s3 requires this)
        fs.stat(filepath, function (err, fileInfo) {
            var bodyStream = fs.createReadStream(filepath);

            var options = {
                BucketName: amazonS3conf.BucketName,
                ObjectName: amazonS3conf.ObjectName + filename,
                ContentLength: fileInfo.size,
                Body: bodyStream,
                Acl: 'public-read'
            };

            addImageContentType(filename, options);

            s3.PutObject(options, function (err, data) {
                cb(err, data);
            });
        });
    },

    putObjects: function (files, folder, cb) {
        var length = _.keys(files).length,
            i = 0;

        function onPutObject(err) {
            if (err) {
                cb(err);
                return;
            }
            i++;
            if (i === length - 1) {
                cb(null, files);
            }
        }

        _.forEach(files, function (val) {
            this.putObject(AvatarService.getTempFilePath() + val, path.join(folder, val), onPutObject);
        }.bind(this));
    },

    getAvatarUrl: function(object, key) {
        return path.join('https:/', this.getHost(), amazonS3conf.BucketName,
            amazonS3conf.ObjectName, object.id, object.avatar[key]);
    },

    getHost: function() {
        return s3.host();
    }

}