/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
    upload: function (req, res) {
        req.validate({
            id: 'string'
        });
        var reqData = actionUtil.parseValues(req);
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/category');
        req.file('banner').upload({
            dirname: defaultAssetsPath,
            maxBytes: 10000000
        }, function (err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            Category.update({ id: reqData.id }, {
                bannerUrl: require('util').format('category/banner/%s', reqData.id),
                bannerFd: uploadedFiles[0].fd
            }).exec(function (err, updated) {
                if (err) return res.negotiate(err);
                return res.ok();
            });
        });
    },
    banner: function (req, res) {
        req.validate({
            id: 'string'
        });
        var reqData = actionUtil.parseValues(req);
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
        var defaultPlaceholder = 'default-placeholder';
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/category');
        if (reqData.id === defaultPlaceholder) {
            res.set("Content-disposition", "attachment; filename='" + defaultPlaceholder + "'");
            fileAdapter.read(defaultAssetsPath + '/' + defaultPlaceholder + '.png').on('error', function (err) {
                return res.serverError(err);
            }).pipe(res);
        } else {
            Category.findOne(reqData.id).exec(function (err, category) {
                if (err) return res.negotiate(err);
                if (!(category || category.bannerFd)) {
                    return res.notFound();
                }
                res.set("Content-disposition", "attachment; filename='" + category.bannerFd + "'");
                fileAdapter.read(user.bannerFd).on('error', function (err) {
                    return res.serverError(err);
                }).pipe(res);
            });
        }
    },
};

