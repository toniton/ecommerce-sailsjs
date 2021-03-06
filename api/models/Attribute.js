/**
 * Attribute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string"
    },
    category: {
      model: "category"
    },
    dataType: {
      type: "string",
      enum: ["integer", "string", "boolean", "float", "dropdown"],
      defaultsTo: "string"
    },
    options: {
      type: "array",
      defaultsTo: null
    },
    unit: {
      type: "string",
      defaultsTo: null
    }
  }
};

