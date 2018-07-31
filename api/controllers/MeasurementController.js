/**
 * MeasurementController
 *
 * @description :: Server-side logic for managing measurements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload: function (req, res) {
        req.validate({
            customer: 'string'
        });
        var reqData = actionUtil.parseValues(req);
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/videos/measurement');
        req.file('video').upload({
            dirname: defaultAssetsPath,
            maxBytes: 10000000
        }, function (err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            Measurement.update({ customer: reqData.customer }, {
                videoUrl: require('util').format('videos/measurement/%s', reqData.id),
                videoFd: uploadedFiles[0].fd
            }).exec(function (err, updated) {
                if (err) return res.negotiate(err);
                return res.ok();
            });
        });
    }
};

