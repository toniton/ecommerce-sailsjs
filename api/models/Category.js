/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true
    },
    description: {
      type: "string"
    },
    bannerUrl: {
      type: 'string',
      defaultsTo: () => {
        return 'category/banner/default-placeholder';
      }
    },
    bannerFd: {
      type: 'string',
      defaultsTo: () => {
        var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/category');
        return defaultAssetsPath + '/default-placeholder.png';
      }
    },
    parent: {
      model: 'category',
      defaultsTo: null
    },
    children: {
      collection: 'category',
      via: 'parent'
    },
    attributes: {
      collection: 'attribute',
      via: 'category'
    },
    products: {
      collection: 'product',
      via: 'categories',
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.bannerFd;
      return obj;
    }
  }
};

