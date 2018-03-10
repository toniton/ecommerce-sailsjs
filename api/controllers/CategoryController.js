/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

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
                fileAdapter.read(category.bannerFd).on('error', function (err) {
                    return res.serverError(err);
                }).pipe(res);
            });
        }
    },
    find: function (req, res) {
        var reqData = actionUtil.parseValues(req);
        if (reqData.id) {
            return this.findOne(req, res);
        }
        Category.find({ "parent": null })
            .populate('children')
            .populate('attributes')
            .then((data) => {
                return Promise.map(data, (category) => {
                    return new Promise((resolve, reject) => {
                        Product.native((err, collection) => {
                            if (err) return res.serverError(err);

                            collection.aggregate([
                                {
                                    $lookup: {
                                        from: "category_products__product_categories",
                                        localField: "_id",
                                        foreignField: "product_categories",
                                        as: "categories"
                                    }
                                },
                                {
                                    $project: {
                                        categories: 1
                                    }
                                },
                                { $unwind: "$categories" },
                                {
                                    $match: {
                                        "categories.category_products": new ObjectId(category.id)
                                    }
                                },
                                { $count: "products" }
                            ]).toArray((err, response) => {
                                if (err) {
                                    reject(err);
                                }
                                if (typeof (response) === 'undefined') {
                                    category.productCount = 0;
                                } else if (response && response.length !== 1) {
                                    category.productCount = 0;
                                } else if (response && response[0] && response[0].products) {
                                    category.productCount = response[0].products;
                                }
                                resolve(category);
                            }
                            );
                        });
                    });
                }).then((categories) => res.ok(categories));
            }).catch((reason) => res.negotiate(reason));
    },
    findOne: function (req, res) {
        req.validate({
            id: 'string'
        });
        var reqData = actionUtil.parseValues(req);
        Category.findOne({ id: reqData.id })
            .populate('children')
            .populate('attributes')
            .populate('products')
            .then((category) => {
                return new Promise((resolve, reject) => {
                    if (!category) return reject(null);

                    Product.native((err, collection) => {
                        if (err) reject(err);

                        collection.aggregate([
                            {
                                $lookup: {
                                    from: "category_products__product_categories",
                                    localField: "_id",
                                    foreignField: "product_categories",
                                    as: "categories"
                                }
                            },
                            {
                                $project: {
                                    categories: 1
                                }
                            },
                            { $unwind: "$categories" },
                            {
                                $match: {
                                    "categories.category_products": new ObjectId(category.id)
                                }
                            },
                            { $count: "products" }
                        ],
                            function (err, response) {
                                if (err) {
                                    reject(err);
                                }
                                if (typeof (response) === 'undefined') {
                                    category.productCount = 0;
                                } else if (response && response.length !== 1) {
                                    category.productCount = 0;
                                } else if (response && response[0] && response[0].products) {
                                    category.productCount = response[0].products;
                                }
                                resolve(category);
                            }
                        );
                    });
                }).then((category) => res.ok(category));
            }).catch((reason) => res.negotiate(reason));
    }
};

