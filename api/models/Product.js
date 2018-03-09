/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true
    },
    sku: {
      type: "text",
      defaultsTo: function() {
        return uuid.v4();
      }
    },
    shortDescription: {
      type: "text",
    },
    description: {
      type: "text",
    },
    minPrice: {
      type: "float"
    },
    price: {
      type: "float",
      required: true
    },
    specialPrice: {
      type: "float"
    },
    maxPrice: {
      type: "float"
    },
    thumbnailUrl: {
        type: 'string',
        defaultsTo: () => {
          return 'product/thumbnail/default-placeholder';
        }
    },
    thumbnailFd: {
        type: 'string',
        defaultsTo: () =>{
          var defaultAssetsPath = require('path').resolve(sails.config.appPath, 'assets/images/product');
          return defaultAssetsPath + '/default-placeholder.png';
        }
    },
    categories: {
        collection: 'category',
        via: 'products',
    },
    config: {
      type: 'string',
      enum: ['simple','configurable','downloadable','virtual'],
      defaultsTo: 'simple'
    },
    parent: {
        model: 'product',
        defaultsTo: null
    },
    children: {
      collection: 'product',
      via: 'parent',
      defaultsTo: null
    },
    media: {
      collection: 'media',
      via: 'product'
    },
    styles: {
      collection: 'style',
      via: 'products',
      dominant: true
    },
    tags: {
      type: "array"
    },
    sort: {
      type: 'integer',
      autoIncrement: true
    },
    status: {
      type: 'string',
      enum: ['pending', 'approved', 'denied'],
      defaultsTo: 'pending'
    }
  }
};

