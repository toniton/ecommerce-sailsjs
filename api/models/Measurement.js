/**
 * Measurement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    customer: {
      model: "customer"
    },
    unit: {
      type: "string",
      enum: ["cm", "inch"],
      defaultsTo: "cm"
    },
    neck: {
      type: "float",
    },
    chest: {
      type: "float",
    },
    waist: {
      type: "float",
    },
    seat: {
      type: "float",
    },
    shirtLength: {
      type: "float",
    },
    shoulderWidth: {
      type: "float",
    },
    armLength: {
      type: "float",
    },
    wrist: {
      type: "float",
    },
    biceps: {
      type: "float",
    },
    hip: {
      type: "float",
    },
    inseam: {
      type: "float",
    },
    sleeveLength: {
      type: "float",
    },
    jacketLength: {
      type: "float",
    },
    videoUrl: {
      type: 'string',
      defaultsTo: null
    },
    videoFd: {
      type: 'string',
      defaultsTo: null
    }
  }
};

