/**
 * Media.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
        type: 'string'
    },
    mediaUrl: {
        type: 'string',
        defaultsTo: null
    },
    mediaFd: {
        type: 'string',
        defaultsTo: '/Users/Toni/Documents/nodejs/paytron/server/assets/images/default.jpg'
    },
    mediaType: {
        type: 'string'
    },
    metadata: {
        type: 'text'
    },
    product: {
      model: 'product'
    },
    type: {
      type: 'string',
      enum:["fabric","style"]
    },
  }
};

