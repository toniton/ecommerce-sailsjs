/**
 * Category.js
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
    description: {
      type: "string"
    },
    bannerUrl: {
        type: 'string',
        defaultsTo: null
    },
    bannerFd: {
        type: 'string',
        defaultsTo: '/Users/Toni/Documents/nodejs/paytron/server/assets/images/default.jpg'
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
      collection: 'category',
      via: 'category'
    },
    products: {
      collection: 'product',
      via: 'category',
    }
  }
};

