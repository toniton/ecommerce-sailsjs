/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    items: {
      collection: "orderitem",
      via:"order"
    },
    styles: {
      collection: "orderstyle",
      via:"order"
    },
    total: {
      type: "float"
    },
    memos: {
      collection: "memo",
      via: "order"
    },
    vat: {
      type: "float"
    },
    status: {
      type: "string",
      enum: ["pending","processing","paid","en-route","delivered","completed","cancelled"],
      defaultsTo: "pending"
    }
  }
};

