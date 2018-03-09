/**
 * FabricController
 *
 * @description :: Server-side logic for managing fabrics
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
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/product');
        req.file('thumbnail').upload({
            dirname: defaultAssetsPath,
            maxBytes: 10000000
        }, function (err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            Product.update({ id: reqData.id }, {
                thumbnailUrl: require('util').format('product/thumbnail/%s', reqData.id),
                thumbnailFd: uploadedFiles[0].fd
            }).exec(function (err, updated) {
                if (err) return res.negotiate(err);
                return res.ok();
            });
        });
    },
    thumbnail: function (req, res) {
        req.validate({
            id: 'string'
        });
        var reqData = actionUtil.parseValues(req);
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
        var defaultPlaceholder = 'default-placeholder';
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/product');
        if (reqData.id === defaultPlaceholder) {
            res.set("Content-disposition", "attachment; filename='" + defaultPlaceholder + "'");
            fileAdapter.read(defaultAssetsPath + '/' + defaultPlaceholder + '.png').on('error', function (err) {
                return res.serverError(err);
            }).pipe(res);
        } else {
            Product.findOne(reqData.id).exec(function (err, product) {
                if (err) return res.negotiate(err);
                if (!(product || product.thumbnailFd)) {
                    return res.notFound();
                }
                res.set("Content-disposition", "attachment; filename='" + product.thumbnailFd + "'");
                fileAdapter.read(product.thumbnailFd).on('error', function (err) {
                    return res.serverError(err);
                }).pipe(res);
            });
        }
    },
};

